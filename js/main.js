
var teamsLayerGroup = L.layerGroup();
// Fetch JSON data from a local file using fetch API
fetch("data/data.json")
  .then((response) => response.json()) // Parse JSON response
  .then((data) => {
    // Iterate through the list of objects
    data.forEach((item) => {
      var hockeyIcon = L.icon({
        iconUrl: `https://assets.nhle.com/logos/nhl/svg/${item.abbreviation}_dark.svg`, // URL to your custom icon image  ./pictures/ice-hockey.png https://assets.nhle.com/logos/nhl/svg/BOS_dark.svg
        iconSize: [50, 50],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      var html = `
                    <h3>${item.name}</h3>
                    <h6><a href="${item.officialSiteUrl}">Offical site</a></h6>
                    <p>
                    
                    <ul>
                      <li><b>Division:</b> ${item.division.name}</li>
                      <li><b>Conference:</b> ${item.conference.name}</li>
                      <li><b>First Year of Play:</b> ${item.firstYearOfPlay}</li>
                      <li><b>City:</b> ${item.venue.city}</li>
                      <li><b>Venue:</b> ${item.venue.name}</li>
                      <li><b>Address:</b> ${item.address}</li>
                    </ul>
                    </p>
                `
      // Add a marker to the map
      var marker = L.marker([item.latitude, item.longitude], {icon: hockeyIcon})
        .bindPopup(html) // Add a popup to the marker with a message
      teamsLayerGroup.addLayer(marker);

      console.log(item);
    });
  })
  .catch((error) => {
    // Handle errors here
    console.error("Error fetching JSON:", error);
  });






// JavaScript code for creating the map
var map = L.map("map").setView([40.526, -100.2551], 4); // Set initial coordinates and zoom level

// Add a tile layer to the map (OpenStreetMap as the base map)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

//kmls
var kmlCentralDivLayerGroup = omnivore.kml('./data/central-division.kml',null, L.geoJson(null, {
  style: function (feature) {
      return {
          color: '#087E8B', // Set the color
          weight: 4 // Set the line thickness
      };
  }}));
var kmlAtlanticDivLayerGroup = omnivore.kml('./data/atlantic-division.kml',null, L.geoJson(null, {
  style: function (feature) {
      return {
          color: '#FF5A5F', // Set the color
          weight: 4 // Set the line thickness
      };
  }}));
var kmlMetropolitanDivLayerGroup = omnivore.kml('./data/metropolitan-division.kml',null, L.geoJson(null, {
  style: function (feature) {
      return {
          color: '#3C3C3C', // Set the color
          weight: 4 // Set the line thickness
      };
  }}));
var kmlPacificDivLayerGroup = omnivore.kml('./data/pacific-division.kml',null, L.geoJson(null, {
  style: function (feature) {
      return {
          color: '#8B5D33', // Set the color
          weight: 4 // Set the line thickness
      };
  }}));


// Image Layer - Statistics
var statsLayerGroup = L.layerGroup();
var imageUrl = './data/nhl-projected-standings.png';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Projected NHL Standings 2023';
var latLngBounds = L.latLngBounds([[49.384358, -66.934570], [24.396308, -125.001650]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.3,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
});
statsLayerGroup.addLayer(imageOverlay);


// Create an overlay object for the layer control
var overlays = {
  "Teams": teamsLayerGroup,
  "Central division":kmlCentralDivLayerGroup,
  "Atlantic division":kmlAtlanticDivLayerGroup,
  "Metropolitan division":kmlMetropolitanDivLayerGroup,
  "Pacific division":kmlPacificDivLayerGroup,
  "Projected Points 2023":statsLayerGroup
};

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


var layerControl = L.control.layers(baseMaps, overlays).addTo(map);

teamsLayerGroup.addTo(map);
kmlCentralDivLayerGroup.addTo(map);
kmlAtlanticDivLayerGroup.addTo(map);
kmlMetropolitanDivLayerGroup.addTo(map);
kmlPacificDivLayerGroup.addTo(map);

statsLayerGroup.addTo(map);





var clipboard = new ClipboardJS('#copyButton', {
  target: function(trigger) {
      return trigger.nextElementSibling;
  }
});

clipboard.on('success', function(e) {
  alert('Code copied to clipboard!');
  e.clearSelection();
});
