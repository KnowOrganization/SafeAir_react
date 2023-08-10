import React, { useState } from "react";
import safeair from "../assets/safeair.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	return (
		<div>
			<header className="sticky top-0 z-20 shadow-lg shadow-gray-600">
				<nav className="flex justify-between bg-gray-900 text-white w-full sticky top-0 h-auto items-center z-10 text-2xl font-bold px-5 py-2">
					<h1 className="flex items-center">
						<Link to={'/'}>
							<img src={safeair} alt="logo" className="h-20" />
						</Link>
					</h1>
					<div className="hidden md:flex items-center h-full">
						<ul className="flex items-center h-full">
							<li className="p-4 h-full flex justify-center items-center hover:text-blue-500 hover:underline duration-300 ease-in ">
								<Link to={"/signin"}>Admin Console</Link>
							</li>
							{/* <li className="p-4 h-full flex justify-center items-center hover:text-blue-500 hover:underline duration-300 ease-in">
								<Link to={"/createemployee"}>Create Employees</Link>
							</li>
							<li className="p-4 h-full flex justify-center items-center hover:text-blue-500 hover:underline duration-300 ease-in">
								<Link to={"/employees"}>View Employees</Link>
							</li> */}
							<li className="font-extrabold text-3xl font-serif p-4 h-full flex justify-center items-center hover:text-blue-500 hover:underline duration-300 ease-in">
								<Link to={"/signin"}>Sign in</Link>
							</li>
						</ul>
					</div>
					{/* Hamburger Menu Icon */}
					<div className="md:hidden flex items-center">
						{showMenu ? (
							<FaTimes
								className="text-3xl cursor-pointer"
								onClick={toggleMenu}
							/>
						) : (
							<FaBars
								className="text-3xl cursor-pointer"
								onClick={toggleMenu}
							/>
						)}
					</div>

					{/* Mobile Menu */}
					{showMenu && (
						<div className="md:hidden absolute top-20 right-4 bg-black min-w-40 py-2 shadow-md z-10">
							<ul className="flex flex-col items-center">
								<li className="p-4 w-full text-center hover:text-blue-500 hover:underline">
									<Link to={"/signin"}>Admin Console</Link>
								</li>
								{/* <li className="p-4 w-full text-center hover:text-blue-500 hover:underline">
									<Link to={"/createemployee"}>Create Employees</Link>
								</li>
								<li className="p-4 w-full text-center hover:text-blue-500 hover:underline">
									<Link to={"/employees"}>View Employees</Link>
								</li> */}
								<li className="font-extrabold text-3xl font-serif p-4 w-full text-center hover:text-blue-500 hover:underline">
									<Link to={"/signin"}>Sign in</Link>
								</li>
							</ul>
						</div>
					)}
				</nav>
			</header>
		</div>
	);
};
export default Header;
