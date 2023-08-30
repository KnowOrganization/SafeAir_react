import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { database } from "./firebase";
import UserList from "./pages/UserList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Employees from "./pages/Employees";
import CreateEmp from "./pages/CreateEmp";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";

// import io from "socket.io-client";
// const socket = io.connect("https://vercel.com/samishaikh6810/safeair/4jGZ4s3VStyNM3MJqdZZNroT9gpS:3001");

function App() {
	const [lacation, setLocation] = useState([]);
	const [isTracking, setIsTracking] = useState(false);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<Home/>}
				/>
				<Route path="userlist" element={<UserList />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="employees" element={<Employees />} />
				<Route path="createemployee" element={<CreateEmp />} />
				<Route path="attendance" element={<Attendance />} />
			</Routes>
		</div>
	);
}

export default App;
