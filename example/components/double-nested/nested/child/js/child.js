'use strict';

function getFakeUrl(url, id) {

    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == XMLHttpRequest.DONE) {

            switch (xmlhttp.status) {
                case 200:
                    document.getElementById(id).innerHTML = xmlhttp.responseText;
                    break;
                case 400:
                    console.log('There was an error 400');
                    break;
                default:
                    console.log('something else other than 200 was returned');
                    break;
            }
        }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();

}

const resource = {
    url: 'http://example.com/dave/search',
    response: {
        status: 200,
        body: [
            {
                "title": "Alchemy",
                "classification": "Writing",
                "url": "https://www.pottermore.com/writing-by-jk-rowling/alchemy",
                "type": "Writing",
                "label": "j.k. rowling writing"
            },
            {
                "title": "Something Else",
                "classification": "Writing",
                "url": "https://www.pottermore.com/writing-by-jk-rowling/something-else",
                "type": "Writing",
                "label": "j.k. rowling writing"
            }
        ]
    }
};

window.getFakeUrl = getFakeUrl;

ZOOL.proxy.add(resource);
