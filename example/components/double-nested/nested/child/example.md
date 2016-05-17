<script>

    ZOOL.proxy.add({
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
    }, true);

</script>

<style>
    .dummy {
        margin: 2em;
        padding: 2em;
        min-height: 300px;
        border: 1px solid #acacac;
        background: url('/assets/another-ping.png');
    }
    
    .spit-the-dummy {
        color: white;
    }
</style>

<div class="dummy">
    <button onclick="getFakeUrl('http://example.com/dave/search', 'putMeHere')">Get Fake....</button>
    <div id="putMeHere" class="spit-the-dummy"></div>
</div>
