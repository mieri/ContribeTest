//Key:
//378eebe9bf01964e02e93667c179ae6a
//
//Secret:
//32865ed04e097157

function flickrRequest(props) {
    var prop,
        xmlhttp = new XMLHttpRequest(),
        url = 'https://api.flickr.com/services/rest/?api_key=378eebe9bf01964e02e93667c179ae6a&format=json&method=' + props.method;
    
    if(props.hasOwnProperty('args')) {
        for(prop in props.args){
            url += '&' + prop + '=' + props.args[prop];
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
}

flickrRequest({
    success: function (response) {
        debugger;
    },
    method: 'flickr.test.echo',
    args: {
        name: 'test'
    }
});
