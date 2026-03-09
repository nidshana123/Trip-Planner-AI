import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationCoordinates } from "../data/locationCoordinates";

export default function MapView() {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {

    const stored = sessionStorage.getItem("tripLocations");

    if (!stored) return;

    const places = JSON.parse(stored);

    const mapped = places
      .map(place => {

        const coord = locationCoordinates[place];

        if (!coord) return null;

        return {
          name: place,
          lat: coord.lat,
          lng: coord.lng
        };

      })
      .filter(Boolean);

    setMarkers(mapped);

  }, []);

  return (
    <div style={{ height: "90vh", padding: "20px" }}>
      <h2>Trip Locations Map</h2>

      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={12}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lng]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// function Routing({ markers }) {

//   const map = useMap();

//   useEffect(() => {

//     if (markers.length < 2) return;

//     const waypoints = markers.map(m => L.latLng(m.lat, m.lng));

//     const routingControl = L.Routing.control({
//       waypoints: waypoints,
//       routeWhileDragging: false,
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true
//     }).addTo(map);

//     return () => map.removeControl(routingControl);

//   }, [markers, map]);

//   return null;
// }

// export default function MapView() {

//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {

//     const stored = sessionStorage.getItem("tripLocations");

//     if (!stored) return;

//     const places = JSON.parse(stored);

//     async function fetchCoordinates() {

//       const results = [];

//       for (const place of places) {

//         try {

//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
//           );

//           const data = await response.json();

//           if (data.length > 0) {

//             results.push({
//               name: place,
//               lat: parseFloat(data[0].lat),
//               lng: parseFloat(data[0].lon)
//             });

//           }

//         } catch (error) {

//           console.error("Geocoding error:", error);

//         }

//       }

//       setMarkers(results);

//     }

//     fetchCoordinates();

//   }, []);

//   return (
//     <div style={{ height: "90vh", padding: "20px" }}>

//       <h2>Trip Locations Map</h2>

//       <MapContainer
//         center={[11.0168, 76.9558]}
//         zoom={12}
//         style={{ height: "80vh", width: "100%" }}
//       >

//         <TileLayer
//           attribution="© OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {markers.map((place, index) => (
//           <Marker key={index} position={[place.lat, place.lng]}>
//             <Popup>{place.name}</Popup>
//           </Marker>
//         ))}

//         <Routing markers={markers} />

//       </MapContainer>

//     </div>
//   );
// }