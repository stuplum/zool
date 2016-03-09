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

window.getFakeUrl = getFakeUrl;
