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
    let request = new Request(`https://api.artic.edu/api/v1/artworks/${id}?fields=title,thumbnail,artist_display,place_of_origin,medium_display,credit_line`, {
        method: 'GET'
    });

    let result = await fetch(request);

    let response = await result.json();

    console.log(response);

    let text = document.getElementsByTagName('p')[img_index]
    text.innerHTML = `<span class="fw-bold">Title:</span> ${response.data.title}<br /><br />
                    <span class="fw-bold">Artist:</span> ${response.data.artist_display}`

    let text_alt = document.getElementsByTagName('img')[img_index]
    text_alt.alt = `${response.data.thumbnail.alt_text}`
};

// async function getInfo(p_index) {
//     let id = document.getElementsByTagName('p')[p_index].getAttribute('id');
//     console.log(id)
//     let request = new Request(`https://api.artic.edu/api/v1/artworks/${id}?fields=title,thumbnail,artist_display,place_of_origin,medium_display,credit_line`, {
//         method: 'GET'
//     });

//     let result = await fetch(request);

//     let response = await result.json();

//     console.log(response);

//     console.log(response.data.title);
//     console.log(response.data.thumbnail.alt_text);
//     console.log(response.data.artist_display);
//     console.log(response.data.place_of_origin);
//     console.log(response.data.medium_display);
//     console.log(response.data.credit_line);
// };

function requestImages() {
    let arr = document.getElementsByTagName('p');
    for (i = 1; i < arr.length; i++) {
        getImage(i);
    };
}

requestImages()
