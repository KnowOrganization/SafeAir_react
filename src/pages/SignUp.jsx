import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/safeair.png";

function SignUp() {
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [type, settype] = useState("");

	const createUser = () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				// ...
				updateProfile(auth.currentUser, {
					displayName: name,
				})
					.then(() => {
						// Profile updated!
						// ...
					})
					.catch((error) => {
						// An error occurred
						// ...
					});
				const docRef = await setDoc(doc(db, "Users", email), {
					name,
					email,
					type,
				});
				toast.success("Successfully created!");
				console.log(userCredential.user);
			})
			.catch((error) => {
				toast.error("User Already Exist");
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ..
			});
	};

	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-back">
			<Helmet>
				<title>Astrum | SignUp</title>
			</Helmet>
			{/*  Site header */}
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 5000,
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
			{/*  Page content */}
			<main className="flex-grow">
				{/* <section className="bg-back">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-32 pb-12 md:pt-40 md:pb-20">
							<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
								<h1 className="h1 text-text">
									Welcome. We exist to make post disaster management
									easier.
								</h1>
							</div>

							<div className="max-w-sm mx-auto">
								<div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-text text-sm font-medium mb-1"
												htmlFor="name"
											>
												Name <span className="text-red-600">*</span>
											</label>
											<input
												id="name"
												onChange={(e) => setname(e.target.value)}
												type="text"
												className="form-input w-full text-gray-800"
												placeholder="Enter your name"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-text text-sm font-medium mb-1"
												htmlFor="name"
											>
												Type of User
												<span className="text-red-600">*</span>
											</label>
											<input
												id="name"
												onChange={(e) => settype(e.target.value)}
												type="text"
												className="form-input w-full text-gray-800"
												placeholder="NGO or Government Authority"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-text text-sm font-medium mb-1"
												htmlFor="email"
											>
												Email{" "}
												<span className="text-red-600">*</span>
											</label>
											<input
												id="email"
												onChange={(e) => setemail(e.target.value)}
												type="email"
												className="form-input w-full text-gray-800"
												placeholder="Enter your email address"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-text text-sm font-medium mb-1"
												htmlFor="password"
											>
												Password{" "}
												<span className="text-red-600">*</span>
											</label>
											<input
												id="password"
												onChange={(e) =>
													setpassword(e.target.value)
												}
												type="password"
												className="form-input w-full text-gray-800"
												placeholder="Enter your password"
												required
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											<button
												className="btn text-black font-semibold bg-yell hover:bg-yell w-full"
												onClick={createUser}
											>
												Sign up
											</button>
										</div>
									</div>
									<div className="text-sm text-gray-500 text-center mt-3">
										By creating an account, you agree to the{" "}
										<a className="underline" href="#0">
											terms & conditions
										</a>
										, and our{" "}
										<a className="underline" href="#0">
											privacy policy
										</a>
										.
									</div>
								</div>
								<div className="flex items-center my-6">
									<div
										className="border-t border-gray-300 flex-grow mr-3"
										aria-hidden="true"
									></div>
									<div className="text-gray-600 italic">Or</div>
									<div
										className="border-t border-gray-300 flex-grow ml-3"
										aria-hidden="true"
									></div>
								</div>
								<div className="text-gray-600 text-center mt-6">
									Already using Astrum?{" "}
									<Link
										to="/signin"
										className="text-blue-600 hover:underline transition duration-150 ease-in-out"
									>
										Sign in
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				<section className="bg-gray-50 dark:bg-gray-900">
					<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
						<Link
							to={"/"}
							className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
						>
							<img className="h-32 mr-2" src={logo} alt="logo" />
							{/* Safe Air */}
						</Link>
						<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Create and account
								</h1>
								<form className="space-y-4 md:space-y-6" action="#">
									<div>
										<label
											for="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											onChange={(e) => setemail(e.target.value)}
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
										/>
									</div>
									<div className=" flex items-center justify-center ">
										<label
											for="type"
											className=" text-sm font-medium text-gray-900 dark:text-white"
										>
											Admin ?
										</label>
										<input
											type="checkbox"
											value="admin"
											name="type"
											onChange={(e) => settype(e.target.value)}
											id="type"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 mx-8  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</div>
									<div>
										<label
											for="password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											onChange={(e) => setpassword(e.target.value)}
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required=""
										/>
									</div>

									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="terms"
												aria-describedby="terms"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
												required=""
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												for="terms"
												className="font-light text-gray-500 dark:text-gray-300"
											>
												I accept the
												<a
													className="font-medium text-blue-600 hover:underline dark:text-blue-500"
													href="#"
												>
													Terms and Conditions
												</a>
											</label>
										</div>
									</div>
									<button
										type="submit"
										onClick={createUser}
										className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Create an account
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Already have an account?
										<Link
											to="/signin"
											className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										>
											Login here
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignUp;
