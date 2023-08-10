import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	getAuth,
} from "firebase/auth";

import { auth } from "../firebase";
import { Helmet } from "react-helmet";
import logo from "../assets/safeair.png";

function SignIn() {
	const provider = new GoogleAuthProvider();
	const navigate = useNavigate();
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				navigate("/userlist");
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);

	// const GoogleLogin = () => {
	// 	const auth = getAuth();
	// 	signInWithPopup(auth, provider)
	// 		.then((result) => {
	// 			// This gives you a Google Access Token. You can use it to access the Google API.
	// 			const credential = GoogleAuthProvider.credentialFromResult(result);
	// 			const token = credential.accessToken;
	// 			// The signed-in user info.
	// 			const user = result.user;
	// 			// IdP data available using getAdditionalUserInfo(result)
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			// Handle Errors here.
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 			// The email of the user's account used.
	// 			const email = error.customData.email;
	// 			// The AuthCredential type that was used.
	// 			const credential = GoogleAuthProvider.credentialFromError(error);
	// 			// ...
	// 		});
	// };

	const EmailLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				toast.success("Successfully Login !");
				const user = userCredential.user;
				console.log(user.displayName);
				// ...
			})
			.then(navigate("/userlist"))
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error("Invalid Credentials!");
			});
	};
	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-back">
			<Helmet>
				<title>Astrum | SignIn</title>
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
			{/*  Page content */}
			<main className="flex-grow bg-back">
				{/* <section className=" bg-back">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-32 pb-12 md:pt-40 md:pb-20">

							<div className="max-w-3xl text-text mx-auto text-center pb-12 md:pb-20">
								<h1 className=" text-6xl ">
									Welcome back. We exist to getting help easier.
								</h1>
							</div>


							<div className="max-w-sm mx-auto">
								<div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block  text-sm font-medium mb-1 text-text"
												htmlFor="email"
											>
												Email
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
											<div className="flex justify-between">
												<label
													className="block text-text text-sm font-medium mb-1"
													htmlFor="password"
												>
													Password
												</label>
												<Link
													to="reset-password"
													className="text-sm font-medium text-blue-600 hover:underline"
												>
													Having trouble signing in?
												</Link>
											</div>
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
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<label className="flex items-center">
													<input
														type="checkbox"
														className="form-checkbox"
													/>
													<span className="text-gray-600 ml-2">
														Keep me signed in
													</span>
												</label>
											</div>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											<button
												className="btn text-black font-semibold bg-yell hover:bg-yell w-full"
												onClick={EmailLogin}
											>
												Sign in
											</button>
										</div>
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
								<div className="flex flex-wrap -mx-3">
									<div className="w-full px-3">
										<button
											onClick={GoogleLogin}
											className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
										>
											<svg
												className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
												viewBox="0 0 16 16"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
											</svg>
											<span className="flex-auto pl-16 pr-8 -ml-16">
												Continue with Google
											</span>
										</button>
									</div>
								</div>
								<div className="text-gray-600 text-center mt-6">
									Don’t you have an account?{" "}
									<Link
										to="/signup"
										className="text-blue-600 hover:underline transition duration-150 ease-in-out"
									>
										Sign up
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				<section class="bg-gray-50 dark:bg-gray-900">
					<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
						<Link
							to={"/"}
							class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
						>
							<img class=" h-32 mr-2" src={logo} alt="logo" />
							{/* Safe Air */}
						</Link>
						<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
							<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Sign in to your account
								</h1>
								<form class="space-y-4 md:space-y-6" action="#">
									<div>
										<label
											for="email"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your email
										</label>
										<input
											type="email"
											name="email"
											onChange={(e) => setemail(e.target.value)}
											id="email"
											class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
										/>
									</div>
									<div>
										<label
											for="password"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											onChange={(e) => setpassword(e.target.value)}
											placeholder="••••••••"
											class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required=""
										/>
									</div>
									<div class="flex items-center justify-between">
										<div class="flex items-start">
											<div class="flex items-center h-5">
												<input
													id="remember"
													aria-describedby="remember"
													type="checkbox"
													class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
													required=""
												/>
											</div>
											<div class="ml-3 text-sm">
												<label
													for="remember"
													class="text-gray-500 dark:text-gray-300"
												>
													Remember me
												</label>
											</div>
										</div>
									</div>
									<button
										type="submit"
										onClick={EmailLogin}
										class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Sign in
									</button>
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
									{/* <div className="flex flex-wrap -mx-3">
										<div className="w-full px-3">
											<button
												onClick={GoogleLogin}
												className="btn px-0 py-3 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
											>
												<svg
													className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
													viewBox="0 0 16 16"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
												</svg>
												<span className="flex-auto pl-16 pr-8 -ml-16">
													Continue with Google
												</span>
											</button>
										</div>
									</div> */}
									<p class="text-sm font-light text-gray-500 dark:text-gray-400">
										Don't have an account yet?{" "}
										<Link
											to="/signup"
											class="font-medium text-blue-600 hover:underline dark:text-blue-500"
										>
											Sign up
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

export default SignIn;
