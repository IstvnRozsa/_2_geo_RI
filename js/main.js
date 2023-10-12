// JavaScript code for creating the map
var map = L.map("map").setView([51.505, -0.09], 13); // Set initial coordinates and zoom level

// Add a tile layer to the map (OpenStreetMap as the base map)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add a marker to the map
L.marker([51.505, -0.09])
  .addTo(map)
  .bindPopup("Hello, this is a Leaflet map!") // Add a popup to the marker with a message
  .openPopup(); // Automatically open the popup
