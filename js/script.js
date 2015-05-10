(function () {
    "use strict";

    var timeoutHandle, i, lastSearch,
        mode = 'search',
        selectedImages = [],
        showGallery = document.getElementById('showGallery'),
        searchInput = document.getElementById('searchInput'),
        imageContainer = document.getElementById('imageContainer'),
        largeImageContainer = document.getElementById('largeImageContainer');

    // Get recent photos on page load
    flickr.request({
        success: function(response){
            var photos = JSON.parse(response).photos;

            lastSearch = photos;

            emptyElm(imageContainer);
            imageContainer.appendChild(flickr.createImgElements(photos.photo, 's'));
        },
        method: 'flickr.photos.getRecent'
    });

    showGallery.addEventListener('click', function(event){
        var photos = {photo:[]};
        for(i in selectedImages){
            photos.photo.push(lastSearch.photo[selectedImages[i]]);
        }
        
        lastSearch = photos;
        mode = 'showGallery';

        emptyElm(imageContainer);
        imageContainer.appendChild(flickr.createImgElements(photos.photo, 's'));
    });

    imageContainer.addEventListener('click', function(event){
        var elm = event.target, pos;

        if(mode === 'search'){
            if(elm.nodeName.toLowerCase() === 'img'){
                pos = selectedImages.indexOf(elm.dataset.index);
                if(pos > -1){
                    elm.className = '';
                    selectedImages.splice(pos, 1);
                }
                else{
                    elm.className='selected';
                    selectedImages.push(elm.dataset.index);
                }
            }    
        }
        else{
            if(elm.nodeName.toLowerCase() === 'img'){
                emptyElm(largeImageContainer);
                largeImageContainer.appendChild(flickr.createImgElements([lastSearch.photo[elm.dataset.index]], 'c'));
            }
        }

    });

    searchInput.addEventListener('input', function (event) {
        mode = 'search';
        if(this.value.length > 1){
            window.clearTimeout(timeoutHandle);
            timeoutHandle = window.setTimeout(flickr.request, 200, {
                success: function(response){
                    var photos = JSON.parse(response).photos;

                    lastSearch = photos;

                    emptyElm(imageContainer);
                    emptyElm(largeImageContainer);
                    imageContainer.appendChild(flickr.createImgElements(photos.photo, 's'));
                },
                method: 'flickr.photos.search' ,
                args: {
                    text: searchInput.value
                }
            });
        }
    });

    function emptyElm(elm){
        while( elm.hasChildNodes() ){
            elm.removeChild(elm.lastChild);
        }
    }
}());