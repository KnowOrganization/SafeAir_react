import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/safeair.png";
import emp from "../assets/teamwork.png";
import "leaflet/dist/leaflet.css";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

mapboxgl.accessToken = 'pk.eyJ1IjoibXNhbWlkZXYiLCJhIjoiY2xqc213cDdlMGFxbzNocXNyeTc4MGhlMyJ9.Gl7IzxtX3SOQ8fcHNwTpJw';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState();
	const navigate = useNavigate();
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lat, setLat] = useState(18.472424188489);
	const [lng, setLng] = useState(73.911555147437);
	const [zoom, setZoom] = useState(16);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				// ...
			} else {
				// User is signed out
				navigate("/");
				// ...
			}
		});
	}, []);

	useEffect(() => {
		let intervalId = null;
		intervalId = setInterval(() => {
			const db = getDatabase();
			const starCountRef = ref(db, "locations/");
			onValue(starCountRef, (snapshot) => {
				const data = snapshot.val();
				setUsers(Object.keys(data));
				const keys = Object.keys(data);
				setUserData(data);
				var geojson3 = {
					type: "FeatureCollection",
					features: [],
				};
				for (let i = 0; i < keys.length; i++) {
					geojson3.features.push({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [
								data[keys[i]].longitude,
								data[keys[i]].latitude,
							],
						},
					});
				}
				console.log("Geo json  " + JSON.stringify(geojson3));
				map.current.getSource("loc").setData(geojson3);
			});
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});

		map.current.on("load", async () => {
			map.current.loadImage("/location.png", (error, image) => {
				if (error) throw error;
				map.current.addImage("pointer", image);
				map.current.addSource("loc", {
					type: "geojson",
					data: userData,
				});
				map.current.addLayer({
					id: "loc",
					type: "symbol",
					source: "loc",
					layout: {
						"icon-image": "pointer",
						"icon-size": 0.25,
					},
				});
			});
		});
	}, []);

	const search = () => {
		if (document.getElementById("searchbar") == null) {
			return;
		} else {
			let input = document.getElementById("searchbar").value;
			input = input.toLowerCase();
			let x = document.getElementsByClassName("listItem");

			for (let i = 0; i < x.length; i++) {
				if (!x[i].innerHTML.toLowerCase().includes(input)) {
					x[i].style.display = "none";
				} else {
					x[i].style.display = "list-item";
				}
			}
		}
	};

	return (
		<div>
			<div className="flex">
				<aside className="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<Link to={'/'}>
						<img className="w-auto h-20 " src={logo} alt="" />
					</Link>

					<div className="flex flex-col justify-between flex-1 mt-6">
						<nav className="flex-1 -mx-3 space-y-5 mt-16 ">
							<div className="relative mx-3">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg
										className="w-5 h-5 text-gray-700"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</span>

								<input
									type="text"
									id="searchbar"
									onKeyUp={search()}
									name="search"
									placeholder="Search..."
									className="w-full py-2.5 pl-10 pr-4 text-gray-700 bg-gray-300 border rounded-full dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
								/>
							</div>
							<div id="list" className=" mb-24">
								{users.map((user, index) => (
									<Link
										key={index}
										className=" flex items-center list-none list px-7 py-3 text-white bg-gray-800 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
										onClick={() => {
											map.current.flyTo({
												center: [
													userData[user].longitude,
													userData[user].latitude,
												],
												essential: true, // this animation is considered essential with respect to prefers-reduced-motion
												zoom: zoom,
												speed: 3,
											});
										}}
									>
										<span
											className="mx-3 text-sm font-medium"
											key={index}
										>
											{userData[user].email}
										</span>
										<div
											className={
												userData[user].status === "offline"
													? "h-3 w-3 bg-red-500 rounded-full"
													: "h-3 w-3 bg-green-500 rounded-full"
											}
										></div>
									</Link>
								))}
							</div>
						</nav>

						<div className=" flex flex-col fixed bottom-0 left-0 pl-7 py-7 bg-black w-full ">
							{/* <div>
								<Link
									to="/employees"
									className="flex items-center gap-x-2"
								>
									<img src={emp} alt="" className=" h-7" />
									<span className="font-medium text-lg text-white dark:text-gray-200">
										Employees
									</span>
								</Link>
							</div> */}
							<div className="flex items-center mt-6">
								<Link to={"/userlist"} className="flex items-center gap-x-2">
									<img
										className="object-cover rounded-full h-7 w-7 profile__pic mr-2"
										src={
											auth.currentUser?.photoURL != null
												? auth.currentUser?.photoURL
												: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_F8Fkc4WqCZ018z4t2RSPmA9iTAdeEaopA&usqp=CAU"
										}
										alt="avatar"
									/>
									<span className="text-sm font-medium text-white dark:text-gray-200">
										{auth.currentUser?.displayName != null
											? auth.currentUser?.displayName
											: "Safe Air"}
									</span>
								</Link>
								<a
									href="#"
									onClick={() => auth.signOut().then(navigate("/"))}
									className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400 mx-7"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</aside>
				<div className=" w-3/4">
					<div ref={mapContainer} className=" h-screen w-full"></div>
				</div>
			</div>
		</div>
	);
};

UserList.propTypes = {};

export default UserList;
