
// creates the map, passing your access token to associate it with your Mapbox account, and setting the container, initial center, and zoom level
const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: parque.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

//criar um marcado ( a var map foi definida acima)
const marcador = new mapboxgl.Marker().setLngLat([-71.06776, 42.35816]).addTo(map);