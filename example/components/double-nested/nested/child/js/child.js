'use strict';

function getFakeUrl(url, id) {

    const targetEl = document.getElementById(id);

    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == XMLHttpRequest.DONE) {

            switch (xmlhttp.status) {
                case 200:
                    targetEl.innerHTML = xmlhttp.responseText;
                    break;
                case 404:
                    console.log('404: $s not found', url);
                    break;
                default:
                    console.log('something else other than 200 was returned', xmlhttp.status);
                    break;
            }
        }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();

}

window.getFakeUrl = getFakeUrl;
