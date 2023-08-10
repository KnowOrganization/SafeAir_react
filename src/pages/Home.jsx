import React from "react";
import map from "../assets/map.png";
import Header from "../components/Header"; 
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" bg-gray-800  ">
        <Header/>
      <div className=" flex justify-center items-center h-screen">
        <div className="w-full sm:w-3/5 flex-col justify-center p-10 md:p-20 items-center text-white">
          <h1 className="px-6 md:px-10 pt-6 md:pt-0 pb-8 md:pb-10 font-bold text-2xl md:text-5xl lg:text-6xl text-gray text-center md:text-left">
            SafeAir Tracking: <br />Your Safety, Our Priority
          </h1>
          <p className="px-6 md:px-10 pb-10 text-sm md:text-lg lg:text-xl text-center md:text-left">
            Discover SafeAir Engineers Pvt. Ltd.'s advanced Employee Tracking
            System: <br />
            <br />
            <ul className="lg:list-disc sm:list-none md:list-none list-disc">
              <li>Real-time monitoring for swift emergency response.</li>
              <li>Access control and attendance management for efficiency.</li>
              <li>Customizable settings balancing security and flexibility</li>
              <li>Privacy assurance with strict data protection protocols</li>
            </ul>
            <br />
            <br />
            Choose us for safety, transparency, efficiency, and flexibility.
            Your well-being is our commitment.
          </p>
          <Link
          to={"/signin"}
            className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 lg:ml-10 sm:m-24 m-36 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  "
          >
            Track Employees
          </Link>
        </div>
        <div className=" md:block sm:w-2/5 p-10 md:p-20 h-screen md:h-auto  flex-col justify-center hidden sm:hidden ">
          <div
            className=" shadow-2xl shadow-black w-4/5 md:w-full h-96 md:h-60 lg:h-96  bg-[image:var(--image-url)] bg-cover"
            style={{ "--image-url": `url(${map})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
