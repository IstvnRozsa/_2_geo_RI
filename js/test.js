document.addEventListener("DOMContentLoaded", function () {
  var map = L.map('map').setView([51.505, -0.09], 13);
  var darkLayer = L.tileLayer.dark();
  var lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  darkLayer.addTo(map); // Default: Dark Mode

  document.getElementById("toggleMode").addEventListener("click", function () {
      if (map.hasLayer(darkLayer)) {
          map.removeLayer(darkLayer);
          map.addLayer(lightLayer);
      } else {
          map.removeLayer(lightLayer);
          map.addLayer(darkLayer);
      }
  });
});
