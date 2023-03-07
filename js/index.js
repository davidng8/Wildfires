/**
This is the script for index.html
Contributors: group AB5
Edited by Frost
*/

// Circle radii for the acres burned map.
const BURNED_ACRES = [1, 10, 100];
      BA_COLORS = ['rgb(255,247,188)','rgb(254,196,79)','rgb(217,95,14)'];
      BA_RADII = [5, 15, 30];

// Add scroll event listener
id("story").addEventListener("scroll", () => {
  console.log('ok');
});

// Setup mapbox basemap
mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJvc3R5Y3MiLCJhIjoiY2xlbTluMXJ2MHp1dzN4bWxlcmRqcGM2eCJ9.e2bM-nuMkNqXTGDvasGjyQ';
map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
  center: [-120.34, 47.30], // starting position [lng, lat]
  zoom: 6, // starting zoom
  projection: 'albers'
});

// Construct Layers
// Large Fires layer
let large_fires = {
  'id': 'lg-fire-polies',
  'type': 'fill',
  'source': 'large-fires',
  'layout': {
    // Make the layer visible by default.
    'visibility': 'visible'
  },
  'paint': {
    'fill-color': '#fc5603',
    'fill-opacity': 0.4
  }
};

// Acres Burned before 2007.
let pre_07 = {
  'id': 'fires-pre-07',
  'type': 'circle',
  'source': 'dnr-90-07',
  'layout': {
    'visibility': 'none'
  },
  'paint': {
    'circle-radius': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_RADII[0]],
        [BURNED_ACRES[1], BA_RADII[1]],
        [BURNED_ACRES[2], BA_RADII[2]]
      ]
    },
    'circle-color': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_COLORS[0]],
      [BURNED_ACRES[1], BA_COLORS[1]],
      [BURNED_ACRES[2], BA_COLORS[2]]
      ]
    },
    'circle-stroke-color': 'black',
    'circle-stroke-width': 1,
    'circle-opacity': 0.6
  }
}



// Large fires data set
map.on('load', () => {
  map.addSource('large-fires', {
    type: 'geojson',
    data: 'assets/Washington_Large_Fires_1973-2020.geojson'
  });

  map.addSource('dnr-90-07', {
    type: 'geojson',
    data: 'assets/DNR_Fire_Statistics_1970-2007.geojson'
  });

  map.addSource('dnr-08-pre', {
    type: 'geojson',
    data: 'assets/DNR_Fire_Statistics_2008_-_Present.geojson'
  });

  // Default large fires map
  map.addLayer(large_fires);
  map.addLayer(pre_07);
});

//Range slider(selecting years)
var sliderOptions = {
  elm: 'slider-control',
  layer: 'lg-fire-polies',
  source: 'large-fires',
  input: true,
  controlWidth: '400px',
  minProperty: 'STARTDATE',
  maxProperty: 'PERIMDATE',
  sliderMin: '1990-01-01T08:00:00Z',
  sliderMax: '2020-01-01T00:00:00Z',
  filterMin: '1990',
  filterMax: '2019',
  propertyType: 'iso8601',
  rangeDescriptionFormat: 'shortDate',
  descriptionPrefix: 'Date:'
}

var sliderOptions = {
  elm: 'slider-control',
  layer: 'fires-pre-07',
  source: 'dnr-90-07',
  input: true,
  controlWidth: '400px',
  minProperty: 'START_DT',
  maxProperty: 'START_DT',
  sliderMin: '1990-01-01T08:00:00Z',
  sliderMax: '2020-01-01T00:00:00Z',
  filterMin: '1990',
  filterMax: '2019',
  propertyType: 'iso8601',
  rangeDescriptionFormat: 'shortDate',
  descriptionPrefix: 'Date:'
}

map.addControl(new RangeSlider(sliderOptions, 'bottom-right'));

//-------------------------------Map Toggles------------------------------------
// Map 1 toggle on/off
id("check1").addEventListener("change", (e) => {
  if (e.target.checked) {
    map.setLayoutProperty('lg-fire-polies', 'visibility', 'visible');
  } else {
    map.setLayoutProperty('lg-fire-polies', 'visibility', 'none');
  }
});

// Map 2 toggle on/off
id("check2").addEventListener("change", (e) => {
  if (e.target.checked) {
    map.setLayoutProperty('fires-pre-07', 'visibility', 'visible');
  } else {
    map.setLayoutProperty('fires-pre-07', 'visibility', 'none');
  }
});

/*------------------------------Helper functions------------------------------*/
// Get id shortcut.
function id(idName) {
  return document.getElementById(idName);
}