mapboxgl.accessToken = 'pk.eyJ1IjoicG9saW5hLWdvcm4iLCJhIjoiY201eTZhdDJyMGc1ODJrcTU0ZmVqZDhmeSJ9.b3lqv0gV68Aikf5HHMdIoQ'; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-web-map', // map container ID
    style: 'mapbox://styles/polina-gorn/cm6iescl7008401qq67x97qm6', // style URL
    center: [-87.683448393991625, 16.18954820578937], // starting position [lng, lat]
    zoom: 2 // starting zoom level
});

map.on('load', () => {
    // Add a data source containing GeoJSON data
   map.addSource('uoft-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    });
    // Add a Mapbox style layer to the map's style
    map.addLayer({
        'id': 'uoft-pnt',
        'type': 'circle',
        'source': 'uoft-data',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    });
    // Add a data source from a GeoJSON file
    map.addSource('buildings-data', {
        type: 'geojson',
        data: 'https://github.com/polina-gorn/lab2/blob/main/wk5-data/buildings.geojson' // Your URL to your buildings.geojson file
    });
    map.addLayer({
        'id': 'buildings-point',
        'type': 'circle',
        'source': 'buildings-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });
});

// Array of marker locations and corresponding images
const locations = [
    { coordinates: [-74.568371, -8.383479], image: 'images/peru.jpg' },
    { coordinates: [-115.83, 55.66], image: 'images/banff.jpg' }
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