import React, { useEffect, useState } from "react";
import TotalSales from "../components/TotalSales";
import CustomerAdded from "../components/CustomerAdded";
import RepaeatingCustomer from "../components/REpaeatingCustomer";
import GeolocationComponents from "../components/Geolocation";
import SalesOverTime from "../components/SalesOverTime";
import Lottie from "lottie-react";
import Clv from "../components/Clv";
import axios from "axios";
import loader2 from "./../assets/loader2.json";
import Footer from "../components/Footer";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBox, FaBoxOpen } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const url = "https://reapidquest-backend.onrender.com/";

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/customers");
        setCustomers(response.data);
        console.log(response.data);
        console.log("custommerssssssssss");
      } catch (err) {
        setError(err);
      }
    };

    fetchCustomers();
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/products");
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    console.log(products);
    fetchProducts();
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/totalorders"
        );
        setOrders(response.data);
      } catch (err) {
        setError(err);
      }
    };
    console.log(products);
    fetchOrders();
  }, []);

  const [salesData, setSalesData] = useState({
    yearlySales: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/totalYearlySales"
        );
        setSalesData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalSales();
  }, []);

  let sum = 0;
  const totalYearlySales = () => {
    return salesData.yearlySales.reduce(
      (acc, sale) => acc + sale.totalPrice,
      0
    );
  };

  console.log(totalYearlySales(), salesData);

  return (
    <div className="overflow-hidden" style={{zIndex:"-1"}}>
      <div className="flex flex-col md:flex-row items-center justify-between px-[3vw] py-4 gap-8 md:gap-0">
        <div className="flex w-[320px] justify-between items-center shadow-lg bg-white h-[150px] rounded-lg px-5 py-2">
          <FaRegUserCircle className="text-6xl font-light"/>
          <div className="flex flex-col">
            <h3 className="font-bold text-md">Customer</h3>
            {customers.length > 0 ? (
              <h1 className="text-4xl font-bold">{customers.length}</h1>
            ) : (
              <div>
                <Lottie animationData={loader2} style={{ width: "50px" }} className="z-10" />
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[320px] justify-between items-center shadow-lg bg-white h-[150px] rounded-lg px-5 py-2">
          <FaBox className="text-6xl font-light" />
          <div className="flex flex-col">
            <h3 className="font-bold text-md">Product</h3>
            {products.length > 0 ? (
              <h1 className="text-4xl font-bold">{products.length}</h1>
            ) : (
              <div>
                <Lottie animationData={loader2} style={{ width: "50px" }} className="z-10" />
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[320px] justify-between items-center shadow-lg bg-white h-[150px] rounded-lg px-5 py-2">
          <FaBoxOpen className="text-6xl font-light" />
          <div className="flex flex-col">
            <h3 className="font-bold text-md">Total Orders</h3>
            {orders.length > 0 ? (
              <h1 className="text-4xl font-bold">{orders.length}</h1>
            ) : (
              <div>
                <Lottie animationData={loader2} style={{ width: "50px" }} className="z-10" />
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[320px] justify-between items-center shadow-lg bg-white h-[150px] rounded-lg px-5 py-2 " >
          <BiSolidDollarCircle className="text-6xl font-light" />
          <div className="flex flex-col">
            <h3 className="font-bold text-md">Total Sales</h3>
            {orders.length > 0 ? (
              <h1 className="text-4xl font-bold">${totalYearlySales().toFixed(0)}</h1>
            ) : (
              <div>
                <Lottie animationData={loader2} style={{ width: "50px" }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col m-auto md:flex-row px-[5vw] py-4 gap-8">
        <TotalSales />
        <SalesOverTime />
      </div>
      <div className="flex flex-col m-auto md:flex-row px-[5vw] py-4 gap-8">
        <CustomerAdded />
        <RepaeatingCustomer />
      </div>
      <div className="flex flex-col m-auto md:flex-row px-[5vw] py-4 gap-8">
        <GeolocationComponents />
        <Clv />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
