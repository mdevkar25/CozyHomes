
const map = L.map('map').setView([18.5204, 73.8567], 13);  // Pune

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([18.5204, 73.8567]).addTo(map)
      .bindPopup('Pune, India')
      .openPopup();


       
//geocode

// function geocode(address) {
//   fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
//     .then(res => res.json())
//     .then(data => {
//       if (data.length === 0) {
//         alert("Location not found");
//         return;
//       }

//       const lat = data[0].lat;
//       const lon = data[0].lon;

//       // Move Leaflet map to location
//       map.setView([lat, lon], 14);

//       // Add marker
//       L.marker([lat, lon]).addTo(map)
//         .bindPopup(address)
//         .openPopup();
//     });
// }

// // Example usage
// geocode("Pune, India");
