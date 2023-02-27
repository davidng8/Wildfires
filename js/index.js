/**
This is the script for index.html
Contributors: group AB5
Edited by Frost
*/

mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJvc3R5Y3MiLCJhIjoiY2xlbTluMXJ2MHp1dzN4bWxlcmRqcGM2eCJ9.e2bM-nuMkNqXTGDvasGjyQ';
map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
  center: [-120.34, 47.30], // starting position [lng, lat]
  zoom: 6, // starting zoom
  projection: 'albers'
});

map.on('load', () => {
  // County Borders
  map.addSource('fires', {
    type: 'geojson',
    data: 'assets/Washington_Large_Fires_1973-2020.geojson'
  })

  map.addLayer({
    'id': 'fire-polies',
    'type': 'fill',
    'source': 'fires',
    'paint': {
      'fill-color': '#fc5603',
      'fill-opacity': 0.4
      }
  })
});

/*------------------------------Helper functions------------------------------*/

function id(query){
  return document.getElementById(query);
}