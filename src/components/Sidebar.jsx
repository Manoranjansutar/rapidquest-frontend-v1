import React, { useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import {
  FaChartLine,
  FaLocationDot,
  FaSquareXTwitter,
  FaUser,
  FaUsers,
  FaYoutube,
} from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/Animation - 1724161809111.json";
import Lottie from "lottie-react";
import { IoMdSettings } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdHelpCenter, MdPrivacyTip } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Sidebar = () => {
  const [select, setSelect] = useState("customer");
  return (
    <div className="sticky top-0 bg-black h-lvh " style={{zIndex:"1000"}}>
      <Link to="/">
        <Lottie
          animationData={logo}
          className="border-b border-grey h-[80px]"
        />
      </Link>
      <NavLink
        to="/customer"
        className={`flex items-center gap-3 px-3 py-3 text-xl  border-b border-black hover:bg-white hover:text-black ${
          select === "customer" ? "bg-white text-black" : "text-white"
        } `}
        onClick={() => {
          setSelect("customer");
        }}
      >
        <FaUser />
        <p>Customer</p>
      </NavLink>

      <NavLink
        to="/product"
        className={`flex items-center gap-3 px-3 py-3 text-xl  border-b border-black hover:bg-white hover:text-black ${
          select === "product" ? "bg-white text-black" : "text-white"
        } `}
        onClick={() => {
          setSelect("product");
        }}
      >
        <IoBagHandleSharp />
        <p>Product</p>
      </NavLink>

      <NavLink
        to="/orders"
        className={`flex items-center gap-3 px-3 py-3 text-xl  border-b border-black hover:bg-white hover:text-black ${
          select === "orders" ? "bg-white text-black" : "text-white"
        } `}
        onClick={() => {
          setSelect("orders");
        }}
      >
        <BsCartCheckFill />
        <p>Orders</p>
      </NavLink>

      <NavLink
        to="/orders"
        className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black"
      >
        <FaChartLine />
        <p>Report</p>
      </NavLink>

      <NavLink
        to="/orders"
        className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black"
      >
        <FaUsers />
        <p>Employee</p>
      </NavLink>
      <div className="mt-5">
        <h2 className="px-4 text-lg text-[#aeaeae] uppercase">Setting</h2>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <ImProfile />
          <p>Profile</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <FaLocationDot />
          <p>Location</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <IoMdSettings />
          <p>Setting</p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="px-4 text-lg text-[#aeaeae] uppercase">Support</h2>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <RiCustomerService2Line />
          <p>Help Center</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <MdHelpCenter />
          <p>FAQs</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 text-xl text-white border-b border-black hover:bg-white hover:text-black">
          <MdPrivacyTip />
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="px-4 text-lg text-[#aeaeae] uppercase mb-5">
          connect us
        </h2>
        <div className="flex justify-center gap-4 text-white">
          <FaFacebookSquare className="text-3xl" />
          <FaYoutube className="text-3xl" />
          <FaSquareXTwitter className="text-3xl" />
          <FaInstagramSquare className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
