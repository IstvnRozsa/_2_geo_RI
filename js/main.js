var westernTeamsCoordinates1 = [];
var easternTeamsCoordinates1 = [];
var teamsLayerGroup = L.layerGroup();
// Fetch JSON data from a local file using fetch API
fetch("data/data.json")
  .then((response) => response.json()) // Parse JSON response
  .then((data) => {
    // Iterate through the list of objects
    data.forEach((item) => {
      var hockeyIcon = L.icon({
        iconUrl: `https://assets.nhle.com/logos/nhl/svg/${item.abbreviation}_dark.svg`, // URL to your custom icon image  ./pictures/ice-hockey.png https://assets.nhle.com/logos/nhl/svg/BOS_dark.svg
        iconSize: [30, 30]
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
                      <li><b>Long:</b> ${item.longitude}</li>
                      <li><b>Lat:</b> ${item.latitude}</li>
                    </ul>
                    </p>
                `
      // Add a marker to the map
      var marker = L.marker([item.latitude, item.longitude], {icon: hockeyIcon,name: item.name })
        .bindPopup(html) // Add a popup to the marker with a message
      teamsLayerGroup.addLayer(marker);

      marker.on('mouseover', function () {
        var teamName = document.getElementById('selected-team');
        var iconUrl = `https://assets.nhle.com/logos/nhl/svg/${item.abbreviation}_dark.svg`
        teamName.innerHTML = `<span><img src="${iconUrl}" alt="Icon" width="30" height="30"></span> ${this.options.name}`;
        console.log(this.options.name);
      });

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

var westernLayerGroup = L.layerGroup();
var westernTeamsCoordinates = [
  [53.5467936, -113.49779461115837], // San Francisco, CA (San Jose Sharks)
  [49.2779085, -123.10894170979472], // San Francisco, CA (San Jose Sharks)
  [37.33286035, -121.90122465574646], // Los Angeles, CA (Los Angeles Kings)
  [34.0429979, -118.2671352463293],
  [33.80783155, -117.876533959295],
  [33.426643, -111.92848865050732],
  [32.7905076, -96.81027213460834],
  [36.1589806, -86.77838189265074],
  [41.88068305, -87.67418510441388],
  [49.8925737, -97.1437218346315],
];

// Create a polygon (square) using the Western Division teams' coordinates
var westernDivisionPolygon = L.polygon(westernTeamsCoordinates, {
  color: '#e49273',  // Border color of the square
  fillColor: '#e49273',  // Fill color of the square
  fillOpacity: 0.5,  // Opacity of the fill color
})
// Fit the map to the bounds of the polygon (square)
westernLayerGroup.addLayer(westernDivisionPolygon);



var easternLayerGroup = L.layerGroup();
var easternTeamsCoordinates = [
  [42.34092995, -83.05516216701272], // San Francisco, CA (San Jose Sharks)
  [27.942704, -82.45189031562487], // San Francisco, CA (San Jose Sharks)
  [26.158496,-80.32552], // San Francisco, CA (San Jose Sharks)
  [42.3662986, -71.06216222263835], // San Francisco, CA (San Jose Sharks)
  [ 45.49605985, -73.56923562545731],  // San Francisco, CA (San Jose Sharks)
  [ 45.296906899999996, -75.92689732572379],  // San Francisco, CA (San Jose Sharks)
  
];

// Create a polygon (square) using the Western Division teams' coordinates
var easternDivisionPolygon = L.polygon(easternTeamsCoordinates, {
  color: "#343a40",  // Border color of the square
  fillColor: "#343a40",  // Fill color of the square
  fillOpacity: 0.5,  // Opacity of the fill color
})
// Fit the map to the bounds of the polygon (square)
easternLayerGroup.addLayer(easternDivisionPolygon);


// Create an overlay object for the layer control
var overlays = {
  "Teams": teamsLayerGroup,
  "Western Conference":westernLayerGroup,
  "Eastern Conference":easternLayerGroup,
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


var infoPanelControl = L.Control.extend({
  options: {
      position: 'bottomleft'
  },
  onAdd: function (map) {
      // Create the info panel element
      var infoPanel = L.DomUtil.create('div', 'info-panel');
      infoPanel.innerHTML = `
                              <h5>&#x1F3C6; Winners in the past 6 years</h5>
                              <ul>
                                <li><b>2022-2023</b>: Vegas Golden Knights</li>
                                <li><b>2021-2022</b>: Colorado Avalanche</li>
                                <li><b>2020-2021</b>: Tampa Bay Lightning</li>
                                <li><b>2019-2020</b>: Tampa Bay Lightning </li>
                                <li><b>2018-2019</b>: St. Louis Blues</li>
                                <li><b>2017-2018</b>: Washington Capitals </li>
                              </ul>
                            
                            `;
      return infoPanel;
  }
});

var selectedPanelControl = L.Control.extend({
  options: {
      position: 'bottomright'
  },
  onAdd: function (map) {
      // Create the info panel element
      var infoPanel2 = L.DomUtil.create('div', 'info-panel');
      infoPanel2.innerHTML = `
                              <h6 id="selected-team"><span><img src="/pictures/ice-hockey.png" alt="Icon" width="20" height="20"></span>Hover over a team</h6>
                            `;
      return infoPanel2;
  }
});

// Add the custom control to the map
map.addControl(new infoPanelControl());
map.addControl(new selectedPanelControl());

