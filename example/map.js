if (!mapboxgl.supported()) {
   map.innerHTML = 'Your browser does not support Mapbox GL,<br><br>Try using another browser like Safari or Mozilla or update your current browser';
   map.style.visibility = 'visible';
} else {
  function loadMap() {
    var latitude = document.getElementById('iss_latitude').innerHTML;
    var longitude = document.getElementById('iss_longitude').innerHTML;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29nZW9yZ2UiLCJhIjoiY2owOGh1Z3ZmMDAxbTJ3czI5ZWNkNWU0MSJ9.uaq3KZrmE_AHCa_6Ayid7w';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [longitude, latitude],
        zoom: 3
    });

    var canvas = map.getCanvasContainer();

    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
            }
        }]
    };
    map.on('load', function() {

        map.addSource('point', {
            "type": "geojson",
            "data": geojson
        });

        map.addLayer({
            "id": "point",
            "type": "circle",
            "source": "point",
            "paint": {
                "circle-radius": 10,
                "circle-color": "purple"
            }
        });
    });
    setTimeout(loadMap, 6000);
  }
  loadMap();
  delete map;
}
