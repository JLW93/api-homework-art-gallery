// jQuery(document).ready(function($) {
//     let alterClass = function() {
//        let ww = document.body.clientWidth;
//        if (ww <= 575) {
//         $("img").removeClass("img-overlap");
//        } else if (ww > 575) {
//         $("img").addClass("img-overlap");
//        };
//     };
//     $(window).resize(function() {
//         alterClass();
//     });
//     alterClass();
// })

async function getImage(img_index) {
    let id = document.getElementsByTagName('p')[img_index].getAttribute('id');
    let request = new Request(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,title,thumbnail,artist_display,place_of_origin,medium_display,credit_line`, {
        method: 'GET'
    });

    let result = await fetch(request);

    let response = await result.json();

    console.log(response);

    let text = document.getElementsByTagName('p')[img_index];
    text.innerHTML = `<span class="fw-bold">Title:</span> ${response.data.title}<br /><br />
                    <span class="fw-bold">Artist:</span> ${response.data.artist_display}<br /><br />
                    <span class="fw-bold">Country of Origin:</span> ${response.data.place_of_origin}<br /><br />
                    <span class="fw-bold">Medium:</span> ${response.data.medium_display}<br /><br />
                    <span class="fw-bold">Credit:</span> ${response.data.credit_line}`;

    let img = document.getElementsByTagName('img')[img_index];
    img.alt = `${response.data.thumbnail.alt_text}`;

    img.src = `${response.config.iiif_url}/${response.data.image_id}/full/843,/0/default.jpg`
};

function requestImages() {
    let arr = document.getElementsByTagName('p');
    for (i = 1; i < arr.length; i++) {
        getImage(i);
    };
}

requestImages()
