

var hockeyIcon = L.icon({
  iconUrl: './pictures/ice-hockey.png', // URL to your custom icon image
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

var teamsLayerGroup = L.layerGroup();
// Fetch JSON data from a local file using fetch API
fetch("data/data.json")
  .then((response) => response.json()) // Parse JSON response
  .then((data) => {
    // Iterate through the list of objects
    data.forEach((item) => {
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

// Create an overlay object for the layer control
var overlays = {
  "Teams": teamsLayerGroup
};

var layerControl = L.control.layers(null, overlays).addTo(map);

teamsLayerGroup.addTo(map);

//layerControl.addOverlay(teamsLayerGroup, "Teams");