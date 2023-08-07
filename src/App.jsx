import Mappage from "./pages/Mappage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDatabase, ref, set } from "firebase/database";

import { database } from "./firebase";
import UserList from "./pages/UserList";
import Map from "./pages/Map";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Employees from "./pages/Employees";
import CreateEmp from "./pages/CreateEmp";
import Home from "./pages/Home";

// import io from "socket.io-client";
// const socket = io.connect("https://vercel.com/samishaikh6810/safeair/4jGZ4s3VStyNM3MJqdZZNroT9gpS:3001");

function App() {
	const [lacation, setLocation] = useState([]);
	const [isTracking, setIsTracking] = useState(false);

	// Function to fetch the device's location and store it in Firebase
	// const fetchAndStoreLocation = () => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				// Get the latitude and longitude
	// 				const { latitude, longitude } = position.coords;
	// 				// Store the location in Firebase
	//     const locationData = { latitude, longitude };

	// 				// socket.emit("sendLocation", {
	//     //   latitude: 'dksjhf',
	//     //   longitude:  'asjkhdgj',
	//     // });
	// 				set(ref(database, "locations/3"), {
	// 					latitude,
	// 					longitude,
	// 					timestamp: Date(),
	// 				});
	// 			},
	// 			(error) => {
	// 				console.error("Error retrieving location:", error);
	// 			}
	// 		);
	// 		console.log("fetchAndStoreLocation");
	// 	} else {
	// 		console.error("Geolocation is not supported by this browser.");
	// 	}
	// };

	// const handleStartStop = () => {
	//   setIsTracking((prevIsTracking) => !prevIsTracking);
	// };

	// useEffect(() => {
	//   let intervalId = null;

	//   if (isTracking) {
	//     intervalId = setInterval(fetchAndStoreLocation, 30000);
	//   } else {
	//     clearInterval(intervalId);
	//   }

	//   return () => {
	//     clearInterval(intervalId);
	//   };
	// }, [isTracking]);

	//   useEffect(() => {
	//     socket.on("location", (location) => {
	//         console.log("message = " + location.latitude);

	//     });
	// }, [socket])

	return (
		<div className="App">
			{/* <button onClick={handleStartStop}>{isTracking ? 'Stop' : 'Start'}</button> */}
			<Routes>
				<Route
					path="/"
					element={<Home/>}
				/>
				{/* <Route path="map" element={<Mappage />} /> */}
				{/* <Route path="map2" element={<Map/>} /> */}
				<Route path="userlist" element={<UserList />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="employees" element={<Employees />} />
				<Route path="createemployee" element={<CreateEmp />} />
			</Routes>
		</div>
	);
}

export default App;
