// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// OpenStreetMap layer
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Street layer (Mapbox Streets)
var streetLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '© Mapbox',
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoiaXN0dmFucm96c2EiLCJhIjoiY2xubjV3N3hsMDNkZzJqbGpibWdlbGc5ZyJ9.PtRFLZGwtfFTRzAVeB4osg'
});

// Satellite layer (Mapbox Satellite)
var satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '© Mapbox',
  id: 'mapbox/satellite-v9',
  accessToken: 'pk.eyJ1IjoiaXN0dmFucm96c2EiLCJhIjoiY2xubjV3N3hsMDNkZzJqbGpibWdlbGc5ZyJ9.PtRFLZGwtfFTRzAVeB4osg'
});

// Define base maps object to switch between layers
var baseMaps = {
  "OpenStreetMap": osmLayer,
  "Street Map": streetLayer,
  "Satellite Map": satelliteLayer
};

// Add layer control to switch between different map types
L.control.layers(baseMaps).addTo(map);