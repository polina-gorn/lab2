mapboxgl.accessToken = 'pk.eyJ1IjoicG9saW5hLWdvcm4iLCJhIjoiY201eTZhdDJyMGc1ODJrcTU0ZmVqZDhmeSJ9.b3lqv0gV68Aikf5HHMdIoQ'; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-web-map', // map container ID
    style: 'mapbox://styles/polina-gorn/cm6iescl7008401qq67x97qm6', // style URL
    center: [-34.683448393991625, 14.18954820578937], // starting position [lng, lat]
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
});