mapboxgl.accessToken = 'pk.eyJ1IjoicG9saW5hLWdvcm4iLCJhIjoiY201eTZhdDJyMGc1ODJrcTU0ZmVqZDhmeSJ9.b3lqv0gV68Aikf5HHMdIoQ'; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-web-map', // map container ID
    style: 'mapbox://styles/polina-gorn/cm6iescl7008401qq67x97qm6', // style URL
    center: [-87.683448393991625, 16.18954820578937], // starting position [lng, lat]
    zoom: 2 // starting zoom level
});

map.on('load', () => {
    // adding a geojson file created on geojson.io and stylizing the layer to make the geojson visible
    map.addSource('travels-from-moscow', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/polina-gorn/lab2/refs/heads/main/lines.geojson'
    });

    map.addLayer({
        id: 'geojson-layer-line',
        type: 'line',
        source: 'travels-from-moscow',
        paint: {
            'line-color': '#696969',
            'line-width': 3
        }
    });
});

// Creating an array with locations to which I will attach the images
// The locations are chosen far from the actual destination to make sure the image does not overlay the text
// Since this map is intended for a small scale view, the precision of the image location is not important
const locations = [
    { coordinates: [-74.568371, -8.383479], image: 'images/peru.jpg' },
    { coordinates: [-115.83, 55.66], image: 'images/banff.jpg' },
    { coordinates: [-113.83, 28.66], image: 'images/ensenada.jpg' },
    { coordinates: [-80.83, 46.66], image: 'images/toronto.jpg' },
];

locations.forEach(loc => {
    // each location mentioned above will be assigned the respective image as a marker, as well as the same width, height and border radius
    const img = document.createElement('img');
    img.src = loc.image;
    img.style.width = '30px'; 
    img.style.height = '30px';
    img.style.borderRadius = '50%'; 

    // creating a new marker with the image on the map
    new mapboxgl.Marker(img)
        .setLngLat(loc.coordinates) //assigning coordinates to the marker
        .addTo(map); //making markers visible on the map
});