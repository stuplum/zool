<script>

    ZOOL.resource = {
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

</script>

This is the real example actually running.....

<div id="putMeHere"></div>

<button onclick="getFakeUrl('http://example.com/dave/search', 'putMeHere')">Get Fake....</button>
