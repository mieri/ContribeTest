//Key:
//378eebe9bf01964e02e93667c179ae6a
//
//Secret:
//32865ed04e097157

var flickr = {
    request: function(props) {
        "use strict";

        var prop,
            xmlhttp = new XMLHttpRequest(),
            url = 'https://api.flickr.com/services/rest/?api_key=378eebe9bf01964e02e93667c179ae6a&nojsoncallback=1&format=json&method=' + props.method;

        if (props.hasOwnProperty('args')) {
            for (prop in props.args) {
                if (props.args.hasOwnProperty(prop)) {
                    url += '&' + prop + '=' + props.args[prop];
                }
            }
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    if (props.hasOwnProperty('success')) {
                        props.success(xmlhttp.response);
                    } else {
                        console.log(xmlhttp);
                    }
                } else {
                    if (props.hasOwnProperty('failure')) {
                        props.failure(xmlhttp.response);
                    } else {
                        console.log(xmlhttp);
                    }
                }
            }
        };

        xmlhttp.open('get', url, true);
        xmlhttp.send();
    },
    createImgElements: function(photos, size){
        var img, df = document.createDocumentFragment();

        for(i in photos){
            img = document.createElement('img');

            img.dataset.index = i;
            img.src = [
                'http://farm', 
                photos[i].farm, 
                '.staticflickr.com/', 
                photos[i].server, 
                '/', 
                photos[i].id, 
                "_", 
                photos[i].secret, 
                '_',
                size,
                '.jpg'
            ].join('');
            df.appendChild(img);
        }
        return df;
    },
    
}