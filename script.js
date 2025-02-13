mapboxgl.accessToken = 'pk.eyJ1IjoicG9saW5hLWdvcm4iLCJhIjoiY201eTZhdDJyMGc1ODJrcTU0ZmVqZDhmeSJ9.b3lqv0gV68Aikf5HHMdIoQ'; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-web-map', // map container ID
    style: 'mapbox://styles/polina-gorn/cm6iescl7008401qq67x97qm6', // style URL
    center: [-87.683448393991625, 16.18954820578937], // starting position [lng, lat]
    zoom: 2 // starting zoom level
});

map.on('load', () => {
    // Add a data source containing GeoJSON data
    map.addSource('multline-data', {
        type: 'geojson',
        data: {
            "type": "Feature",
            "geometry": {
                "type": "MultiLineString",
                "coordinates": [
                    [[37.6, 55.65], [39.40, 43.66]],
                    [[37.6, 55.65], [4.45, 52.68]]
                ]
            },
            "properties": {
                "description": "places i travelled to from Moscow"
            }
        }
    })

    map.addLayer({
    id: 'multiline-layer',
    type: 'line',
    source: 'multiline-data',
    paint: {
        'line-color': '#ff0000', // Red color
        'line-width': 4,
        'line-opacity': 0.8

    }
});
})


// Array of marker locations and corresponding images
const locations = [
    { coordinates: [-74.568371, -8.383479], image: 'images/peru.jpg' },
    { coordinates: [-115.83, 55.66], image: 'images/banff.jpg' },
    { coordinates: [-113.83, 28.66], image: 'images/ensenada.jpg' },
    { coordinates: [-80.83, 46.66], image: 'images/toronto.jpg' },
];

locations.forEach(loc => {
    // Create an image element for the marker
    const img = document.createElement('img');
    img.src = loc.image;
    img.style.width = '30px'; // Adjust size as needed
    img.style.height = '30px';
    img.style.borderRadius = '50%'; // Makes it circular

    // Create a new marker with the image
    new mapboxgl.Marker(img)
        .setLngLat(loc.coordinates)
        //.setPopup(new mapboxgl.Popup().setText(loc.title)) // Optional popup
        .addTo(map);
});