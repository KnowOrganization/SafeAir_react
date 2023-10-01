import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/safeair.png";
import emp from "../assets/teamwork.png";
import "leaflet/dist/leaflet.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import moment from "moment";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

mapboxgl.accessToken =
	"pk.eyJ1IjoibXNhbWlkZXYiLCJhIjoiY2xqc213cDdlMGFxbzNocXNyeTc4MGhlMyJ9.Gl7IzxtX3SOQ8fcHNwTpJw";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState();
	const navigate = useNavigate();
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lat, setLat] = useState(18.518602); //18.518602, 73.855420
	const [lng, setLng] = useState(73.85542);
	const [zoom, setZoom] = useState(16);
	const [loginData, setLoginData] = useState();
	const [date, setDate] = useState("");

	const userID = "admin";
	const userName = "admin";
	const appID = 269204600;
	const serverSecret = "07364575b67641ea3217a9fd7e2b4e1b";
	const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
		appID,
		serverSecret,
		null,
		userID,
		userName
	);
	const zp = ZegoUIKitPrebuilt.create(TOKEN);
	zp.addPlugins({ ZIM });

	const invite = (email) => {
		const targetUser = {
			userID: email,
			userName: email,
		};
		zp.sendCallInvitation({
			callees: [targetUser],
			callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
			timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
		})
			.then((res) => {
				console.warn(res);
			})
			.catch((err) => {
				console.warn(err);
			});
	};

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

	useEffect(async () => {
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
						properties: {
							description:
								"<strong>" +
								data[keys[i]].email +
								"</strong> <p>" +
								data[keys[i]].status +
								"</p>",
						},
					});
				}
				// console.log("Geo json  " + JSON.stringify(geojson3));
				map.current.getSource("loc").setData(geojson3);
			});
		}, 1000);

		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: "http://ec2-15-207-107-191.ap-south-1.compute.amazonaws.com/getLoginData",
			headers: {
				"Content-Type": "application/json",
			},
		};

		await axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				setLoginData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		let dateFormat1 = moment().format("DD-MMM-YYYY");
		setDate(dateFormat1);

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
		map.current.on("style.load", () => {});
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
				map.current.on("click", "loc", (e) => {
					// Copy coordinates array.
					const coordinates = e.features[0].geometry.coordinates.slice();
					const description = e.features[0].properties.description;

					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					new mapboxgl.Popup()
						.setLngLat(coordinates)
						.setHTML(description)
						.addTo(map.current);
				});
				map.current.on("mouseenter", "loc", () => {
					map.current.getCanvas().style.cursor = "pointer";
				});

				// Change it back to a pointer when it leaves.
				map.current.on("mouseleave", "loc", () => {
					map.current.getCanvas().style.cursor = "";
				});
			});
			// Insert the layer beneath any symbol layer.
			const layers = map.current.getStyle().layers;
			const labelLayerId = layers.find(
				(layer) => layer.type === "symbol" && layer.layout["text-field"]
			).id;

			// The 'building' layer in the Mapbox Streets
			// vector tileset contains building height data
			// from OpenStreetMap.
			map.current.addLayer(
				{
					id: "add-3d-buildings",
					source: "composite",
					"source-layer": "building",
					filter: ["==", "extrude", "true"],
					type: "fill-extrusion",
					minzoom: 15,
					paint: {
						"fill-extrusion-color": "#aaa",

						// Use an 'interpolate' expression to
						// add a smooth transition effect to
						// the buildings as the user zooms in.
						"fill-extrusion-height": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "height"],
						],
						"fill-extrusion-base": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							0,
							15.05,
							["get", "min_height"],
						],
						"fill-extrusion-opacity": 0.6,
					},
				},
				labelLayerId
			);
			map.current.addSource("mapbox-dem", {
				type: "raster-dem",
				url: "mapbox://mapbox.mapbox-terrain-dem-v1",
				tileSize: 512,
				maxzoom: 14,
			});
			// add the DEM source as a terrain layer with exaggerated height
			map.current.setTerrain({ source: "mapbox-dem", exaggeration: 2 });
		});
	}, []);

	const search = () => {
		if (document.getElementById("searchbar") == null) {
			return;
		} else {
			let input = document.getElementById("searchbar").value;
			input = input.toLowerCase();
			let x = document.getElementsByClassName("LI");
			for (let i = 0; i < x.length; i++) {
				if (!x[i].innerHTML.toLowerCase().includes(input)) {
					x[i].style.display = "none";
				} else {
					x[i].style.display = "list-item";
				}
			}
		}
	};

	var popup = new mapboxgl.Popup();

	return (
		<div>
			<div className="flex">
				<aside className="flex flex-col w-2/6 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<Link to={"/"}>
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
									<div className=" flex items-center">
										{/* <button
											onClick={() => invite(userData[user].email)}
											className=" bg-white"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 -960 960 960"
												width="24"
												color="white"
											>
												<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880h320q33 0 56.5 23.5T880-800v320q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227v-320H480q-134 0-227 93t-93 227q0 134 93 227t227 93ZM280-360h280v-80l120 80v-240l-120 80v-80H280v240Zm200-120Z" />
											</svg>
										</button> */}
										<Link
											key={index}
											className="LI flex items-center list-none list px-7 py-3 text-white bg-gray-800 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 whitespace-pre"
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
												let setHTML =
													"<strong>" +
													userData[user].email +
													"</strong> <p>" +
													userData[user].status +
													"</p>" +
													"<p>" +
													"First Login: " +
													(loginData.find(
														(u) => u.user === userData[user].email
													) != null &&
													loginData
														.find(
															(u) =>
																u.user === userData[user].email
														)
														.data.find((d) => d.date === date) !=
														null
														? loginData
																.find(
																	(u) =>
																		u.user ===
																		userData[user].email
																)
																.data.find(
																	(d) => d.date === date
																).sessions[0].logInTime
														: "N/A") +
													"</p> <p>" +
													"Login at : " +
													(loginData.find(
														(u) => u.user === userData[user].email
													) != null &&
													loginData
														.find(
															(u) =>
																u.user === userData[user].email
														)
														.data.find((d) => d.date === date) !=
														null
														? loginData
																.find(
																	(u) =>
																		u.user ===
																		userData[user].email
																)
																.data.find(
																	(d) => d.date === date
																).sessions[0].logInLocation[0] +
														  "," +
														  loginData
																.find(
																	(u) =>
																		u.user ===
																		userData[user].email
																)
																.data.find(
																	(d) => d.date === date
																).sessions[0].logInLocation[1]
														: "N/A") +
													"</p>";
												popup = new mapboxgl.Popup({
													offset: [0, -20],
												})
													.setLngLat([
														userData[user].longitude,
														userData[user].latitude,
													])
													.setHTML(setHTML);
												popup.addTo(map.current);
											}}
										>
											<div
												className={
													userData[user].status === "offline"
														? "h-3 w-3 bg-red-500 rounded-full"
														: "h-3 w-3 bg-green-500 rounded-full"
												}
											></div>

											<span
												className="mx-3 text-sm font-medium"
												key={index}
											>
												{userData[user].email}
											</span>
										</Link>
									</div>
								))}
							</div>
						</nav>

						<div className=" flex flex-col fixed bottom-0 left-0 pl-7 py-7 bg-black w-full ">
							<div>
								<Link
									to="/employees"
									className="flex items-center gap-x-2"
								>
									<img src={emp} alt="" className=" h-7" />
									<span className="font-medium text-lg text-white dark:text-gray-200">
										Employees
									</span>
								</Link>
							</div>
							<div className="flex items-center mt-6">
								<Link
									to={"/userlist"}
									className="flex items-center gap-x-2"
								>
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
				<div className=" w-4/6">
					<div ref={mapContainer} className=" h-screen w-full"></div>
				</div>
			</div>
		</div>
	);
};

UserList.propTypes = {};

export default UserList;
