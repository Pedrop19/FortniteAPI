let API = "https://fortnite-api.com/v1/map";
let APIKey = "27e7cbc4-05e3-4e65-90a3-af534dab3ead"

let map = document.getElementById('map');

fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let image = data.data.images.blank;
        map.src = image;
    })
    .catch(error => console.log(error));
