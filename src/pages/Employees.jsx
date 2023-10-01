import React, { useEffect, useState } from "react";
import logo from "../assets/safeair.png";
import location from "../assets/location.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import axios from "axios";

function Employees() {
	const [userData, setUserData] = useState();

	useEffect( () => {
		let config = {
			method: "get",
			maxBodyLength: Infinity,

			url: "http://ec2-15-207-107-191.ap-south-1.compute.amazonaws.com/getAllUsers",
			headers: {
				"Content-Type": "application/json",
			},
		};
		async function fetchData() {
			await axios
			.request(config)
			.then((response) => {
				console.log(response.data.users);
				setUserData(response.data.users);
			})
			.catch((error) => {
				console.log(error);
			});
		}
		fetchData();
	}, []);

	return (
		<div>
			<main>
				<div className=" flex">
					<aside className="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
						<a href="/">
							<img className="w-auto h-20 " src={logo} alt="" />
						</a>

						<div className="flex flex-col justify-between flex-1 mt-6">
							<nav className="flex-1 -mx-3 space-y-5 mt-16 ">
								<div id="list">
									<Link
										to={"/employees"}
										className="listItem flex  px-7 py-5 text-black bg-gray-100 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
									>
										<span className="mx-2 text-lg font-medium">
											View Employees
										</span>
									</Link>
									<Link
										to={"/createemployee"}
										className="listItem flex  px-7 py-5 text-white bg-gray-700 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
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
					<div className=" w-3/4 ">
						<div className="relative overflow-x-auto px-32 mt-32">
							<h1 className=" text-center text-2xl font-bold my-10">
								All Employees
							</h1>
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Name
										</th>
										<th scope="col" className="px-6 py-3">
											Email
										</th>
										<th scope="col" className="px-6 py-3">
											Phone
										</th>
									</tr>
								</thead>
								<tbody>
									{userData != null ? (
										userData.map((user, index) => (
											<tr
												key={index}
												className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
											>
												<th
													scope="row"
													className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													{user.displayName != null
														? user.displayName
														: user.email}
												</th>
												<td className="px-6 py-4">{ user.email }</td>
												<td className="px-6 py-4">{user.phoneNumber != null
														? user.phoneNumber
														: " - "}</td>
											</tr>
										))
									) : (
										<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
											></th>
											<td className="px-6 py-4"></td>
											<td className="px-6 py-4"></td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Employees;
