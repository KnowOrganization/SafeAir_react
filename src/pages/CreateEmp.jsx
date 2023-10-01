import React, { useEffect, useState } from "react";
import logo from "../assets/safeair.png";
import location from "../assets/location.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


function CreateEmp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState(false);

	const createUser = () => {
		let data = JSON.stringify({
			email: email,
			phoneNumber: number,
			password: password,
			displayName: name,
		});

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "http://ec2-15-207-107-191.ap-south-1.compute.amazonaws.com/createUser",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				if (response.data.error) {
					toast.error("Error : " + response.data.message);
				} else {
					toast.success("User Created Successfully");
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("User Creation Failed : " + error.message);
			});
	};

	return (
		<div>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 3000,
					style: {
						background: "#363636",
						color: "#fff",
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							blue: "green",
							secondary: "black",
						},
					},
				}}
			/>
			<main className="flex">
				<aside className="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<a href="/">
						<img className="w-auto h-20 " src={logo} alt="" />
					</a>

					<div className="flex flex-col justify-between flex-1 mt-6">
						<nav className="flex-1 -mx-3 space-y-5 mt-16 ">
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
								<Link
									to={"/attendance"}
									className="listItem flex  px-7 py-5 text-white bg-gray-700 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
								>
									<span className="mx-2 text-lg font-medium">
										Export Employees data
									</span>
								</Link>
							</div>
						</nav>
						<div className=" flex flex-col fixed bottom-0 left-0 pl-7 py-7 bg-black w-1/4 ">
							<div>
								<Link
									to="/userlist"
									className="flex items-center gap-x-2"
								>
									<img src={location} alt="" className=" h-7" />
									<span className="font-medium text-lg text-white dark:text-gray-200">
										Back to Track Employees
									</span>
								</Link>
							</div>
							<div className="flex items-center justify-between mt-6 pr-5">
								<a href="#" className="flex items-center gap-x-2">
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
										Safe Air
									</span>
								</a>

								<a
									href="#"
									onClick={() => auth.signOut()}
									className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
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

				<div className="w-3/4 h-screen flex justify-center items-center">
					<div className="w-3/4 h-auto my-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<form className="space-y-4 md:space-y-6 p-4 ">
							<div className="mb-4">
								<label
									htmlFor="name"
									className="block mb-2 text-xl font-medium text-gray-900"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									onChange={(e) => setName(e.target.value)}
									placeholder="Employee Name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div className="mb-4 ">
								<label className="block mb-2 text-xl font-medium text-gray-900">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@mail.com"
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-xl font-medium text-gray-900">
									Phone Number (with country code)
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									onChange={(e) => setNumber(e.target.value)}
									placeholder="Start with country code i.e. - +91"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-xl font-medium text-gray-900">
									Password
								</label>
								<input
									type="text"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Employee password"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>
							<div className=" flex items-center justify-center ">
								<label className=" block mb-2 text-xl font-medium text-gray-900">
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

							{/* <div className="mb-4">
								<label
									className="block mb-2 text-xl font-medium text-gray-900"
								>
									Mobile Number
								</label>
								<input
									type="tel"
									id="mobile"
									name="mobile"
									placeholder="Employee Mobile Number"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div className="mb-4">
								<label
									className="block mb-2 text-xl font-medium text-gray-900"
								>
									Address
								</label>
								<textarea
									id="address"
									name="address"
									placeholder="Employee Address"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								></textarea>
							</div> */}
							<div className="flex justify-center items-center">
								<div
									onClick={createUser}
									className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
								>
									Create
								</div>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default CreateEmp;
