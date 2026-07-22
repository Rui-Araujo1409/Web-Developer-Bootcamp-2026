// creates the map, passing your access token to associate it with your Mapbox account, and setting the container, initial center, and zoom level
const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    style:"mapbox://styles/mapbox/standard-satellite",
    center: parque.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

//criar um marcado ( a var map foi definida acima)
const marcador = new mapboxgl.Marker()
    .setLngLat(parque.geometry.coordinates)
    .setPopup(                              //para o popup, chamar o método Popup
        new mapboxgl.Popup({offset: 25})    //construir o popup com o parâmetro
        .setHTML(                           //construir o html
            `<h3>${parque.título}</h3>
            <p>${parque.localização}
            `
        )
    )
    .addTo(map);