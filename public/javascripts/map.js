var map = L.map('main_map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZlY29yZSIsImEiOiJja3BpYnY5eWYwMGluMm9wYXlubnEwZTY3In0.c-tzTlqGz2WkrU6Giq1gIw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXZlY29yZSIsImEiOiJja3BpYnY5eWYwMGluMm9wYXlubnEwZTY3In0.c-tzTlqGz2WkrU6Giq1gIw'
}).addTo(map);

 L.marker([51.495161, -0.077402]).addTo(map);
 L.marker([51.49492, -0.079205]).addTo(map);
 L.marker([51.49794, -0.082423]).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})