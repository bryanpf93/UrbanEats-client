// import Map, { Marker } from "react-map-gl/mapbox"
// import "mapbox-gl/dist/mapbox-gl.css"
// import { FaMapMarkerAlt } from "react-icons/fa"
// import { useState } from "react";

// function RestaurantMap({ restaurant }) {

//   const [scrollEnabled, setScrollEnabled] = useState(false);

//   return (
//     <Map
//       initialViewState={{
//         longitude: restaurant.location.coordinates[1],
//         latitude: restaurant.location.coordinates[0],
//         zoom: 17
//       }}
//       style={{
//         width: "50%",
//         height: "400px",
//         borderRadius: "12px"
//       }}
//       mapStyle="mapbox://styles/mapbox/streets-v12"
//       mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}

//       scrollZoom={scrollEnabled}

//       onClick={() => setScrollEnabled(true)}

//       onMouseLeave={() => setScrollEnabled(false)}
//     >

//       <Marker
//         longitude={restaurant.location.coordinates[1]}
//         latitude={restaurant.location.coordinates[0]}
//       >
//         <FaMapMarkerAlt
//           size={35}
//           color="red"
//         />
//       </Marker>

//     </Map>
//   )
// }

// export default RestaurantMap