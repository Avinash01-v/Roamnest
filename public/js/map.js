mapboxgl.accessToken = maptoken;

const map = new mapboxgl.Map({
    accessToken: maptoken,
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup().setHTML("<p>After booking you will be here</p>"))
    .addTo(map);