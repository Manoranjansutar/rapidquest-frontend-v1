import Lottie from "lottie-react";
import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import notification from "./../assets/notification-bell.json";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex gap-3 justify-between items-center h-[80px] w-full border-b border-grey sticky top-0 bg-white z-20">
      <div className="flex items-center gap-3 px-4">
        <FaBarsStaggered
          className="text-xl cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
        <Link
          to="/"
          className="text-xl uppercase md:text-2xl hover:bg-black hover:px-2 hover:py-2 hover:text-white"
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 px-8">
        <input
          type="text"
          className="hidden h-8 p-2 border border-black w-96 md:block"
          placeholder="Search"
        />
        <IoIosSettings className="text-3xl" />
        <Lottie animationData={notification} className="w-10" />
        <button className="px-6 py-3 text-white bg-black rounded-md hover:bg-opacity-80">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
