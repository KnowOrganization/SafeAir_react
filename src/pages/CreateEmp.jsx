import React, { useEffect, useState } from "react";
import logo from "../assets/safeair.png";
import location from "../assets/location.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
// import {
// 	getAuth,
// 	createUserWithEmailAndPassword,
// 	updateProfile,
// 	onAuthStateChanged,
// } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
// import {getAuth} from "firebase-admin/auth"
// import admin from "firebase-admin"
// const serviceAccount = "..serviceAccountKey.json";
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// import { initializeApp } from 'firebase-admin/app';
// const firebaseConfig = {
//   apiKey: "AIzaSyDN_VWXlrqVGAfR9kBeLnvybeL2-gv-r5I",
//   authDomain: "safeair-b0c14.firebaseapp.com",
//   databaseURL: "https://safeair-b0c14-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "safeair-b0c14",
//   storageBucket: "safeair-b0c14.appspot.com",
//   messagingSenderId: "882266510112",
//   appId: "1:882266510112:web:380ceba54239121206bd45"
// };
// const app = initializeApp();
// import * as firebase from "firebase-admin";
// import { adminAuth } from '../admin'

function CreateEmp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState(false);

	console.log(name, email, password, type);

	const createUser = () => {
		// adminAuth()
		// 	.createUser({
		// 		email: email,
		// 		emailVerified: false,
		// 		phoneNumber: number,
		// 		password: password,
		// 		displayName: name,
		// 		disabled: false,
		// 	})
		// 	.then((userRecord) => {
		// 		// See the UserRecord reference doc for the contents of userRecord.

		// 		// try {
		// 		// 	const docRef = addDoc(collection(db, "Users"), {
		// 		// 		email: email,
		// 		// 		phoneNumber: number,
		// 		// 		displayName: name,
    //     //     type: type ? "admin" : "user",
		// 		// 	});
		// 		// 	console.log("Document written with ID: ", docRef.id);
		// 		// } catch (e) {
		// 		// 	console.error("Error adding document: ", e);
		// 		// }
		// 		toast.success("Successfully created!");
		// 		console.log("Successfully created new user:", userRecord.uid);
		// 	})
		// 	.catch((error) => {
		// 		console.log("Error creating new user:", error);
		// 	});
	};

	return (
		<div>
			<main className="flex">
				<aside class="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<a href="/">
						<img class="w-auto h-20 " src={logo} alt="" />
					</a>

					<div class="flex flex-col justify-between flex-1 mt-6">
						<nav class="flex-1 -mx-3 space-y-5 mt-16 ">
							<div id="list">
								<Link
									to={"/employees"}
									className="listItem flex  px-7 py-5 text-white bg-gray-700 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
								>
									<span className="mx-2 text-lg font-medium">
										View Employees
									</span>
								</Link>
								<Link
									to={"/createemployee"}
									className="listItem flex  px-7 py-5  text-black bg-gray-100 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
								>
									<span className="mx-2 text-lg font-medium">
										Add Employees
									</span>
								</Link>
							</div>
						</nav>
						<div class=" flex flex-col fixed bottom-0 left-0 pl-7 py-7 bg-black w-1/4 ">
							<div>
								<Link to="/userlist" class="flex items-center gap-x-2">
									<img src={location} alt="" className=" h-7" />
									<span class="font-medium text-lg text-white dark:text-gray-200">
										Back to Track Employees
									</span>
								</Link>
							</div>
							<div class="flex items-center justify-between mt-6 pr-5">
								<a href="#" class="flex items-center gap-x-2">
									<img
										className="object-cover rounded-full h-7 w-7 profile__pic mr-2"
										src={
											auth.currentUser?.photoURL != null
												? auth.currentUser?.photoURL
												: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_F8Fkc4WqCZ018z4t2RSPmA9iTAdeEaopA&usqp=CAU"
										}
										alt="avatar"
									/>
									<span class="text-sm font-medium text-white dark:text-gray-200">
										Safe Air
									</span>
								</a>

								<a
									href="#"
									onClick={() => auth.signOut()}
									class="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
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

				<div className="w-3/4 h-screen flex justify-center items-center">
					<div className="w-3/4 h-auto my-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<form class="space-y-4 md:space-y-6 p-4 ">
							<div class="mb-4">
								<label
									for="name"
									class="block mb-2 text-xl font-medium text-gray-900"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									onChange={(e) => setName(e.target.value)}
									placeholder="Employee Name"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div class="mb-4 ">
								<label
									for="email"
									class="block mb-2 text-xl font-medium text-gray-900"
								>
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@mail.com"
								/>
							</div>
							<div class="mb-4">
								<label
									for="password"
									class="block mb-2 text-xl font-medium text-gray-900"
								>
									Password
								</label>
								<input
									type="tel"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Employee password"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>
							<div className=" flex items-center justify-center ">
								<label
									for="type"
									className=" block mb-2 text-xl font-medium text-gray-900"
								>
									Admin ?
								</label>
								<input
									type="checkbox"
									value="admin"
									name="type"
									onChange={(e) => setType(!type)}
									id="type"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 mx-8  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							{/* <div class="mb-4">
								<label
									for="mobile"
									class="block mb-2 text-xl font-medium text-gray-900"
								>
									Mobile Number
								</label>
								<input
									type="tel"
									id="mobile"
									name="mobile"
									placeholder="Employee Mobile Number"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div class="mb-4">
								<label
									for="address"
									class="block mb-2 text-xl font-medium text-gray-900"
								>
									Address
								</label>
								<textarea
									id="address"
									name="address"
									placeholder="Employee Address"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								></textarea>
							</div> */}
							<div className="flex justify-center items-center">
								<button
									type="submit"
									onClick={createUser}
									class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
								>
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default CreateEmp;
