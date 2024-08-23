import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RepaeatingCustomer = () => {
  const url = "https://reapidquest-backend.onrender.com/";
  const [repeatingCustomer, setRepeatingCustomer] = useState({
    dailyRepeatCustomers: [],
    monthlyRepeatCustomers: [],
    quarterlyRepeatCustomers: [],
    yearlyRepeatCustomers: [],
  });

  const [error, setError] = useState(null);
  const [selectChart, setSelectChart] = useState("monthlyRepeatChart");

  useEffect(() => {
    const fetchTotalRepeatedCustomer = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/noofreapeatingcustomers"
        );
        console.log(response);
        setRepeatingCustomer(response.data);
        console.log(response.data);
        console.log(repeatingCustomer);
      } catch (error) {
        console.error("Error fetching data:", error); 
        setError(error); 
      }
    };
    fetchTotalRepeatedCustomer();
  }, []);

  //  data for daily repeated customer
  const dailyLabels = repeatingCustomer.dailyRepeatCustomers.map(
    (customer) =>
      `${customer._id.year}-${customer._id.month}-${customer._id.day}`
  );
  const dailyData = repeatingCustomer.dailyRepeatCustomers.map(
    (customer) => customer.repeatCustomers
  );

  const dailyRepeatChart = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Repeated Customer",
        data: dailyData,
        borderColor: "#000",
        backgroundColor: "#000",
      },
    ],
  };

  //data for monthly repeated customer
  const monthlyLabels = repeatingCustomer.monthlyRepeatCustomers.map(
    (customer) => `${customer._id.year}-${customer._id.month}`
  );
  const monthlyData = repeatingCustomer.monthlyRepeatCustomers.map(
    (customer) => customer.repeatCustomers
  );

  const monthlyRepeatChart = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly repeated Customer",
        data: monthlyData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  //data for quarterly repeated customer
  const quartelyLabels = repeatingCustomer.quarterlyRepeatCustomers.map(
    (customer) => `${customer._id.year}-${customer._id.month}`
  );
  const quarterlyData = repeatingCustomer.quarterlyRepeatCustomers.map(
    (customer) => customer.repeatCustomers
  );

  const quarterlyRepeatChart = {
    labels: quartelyLabels,
    datasets: [
      {
        label: "Monthly repeated Customer",
        data: quarterlyData,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  //data for yearly repeated customer
  const yearlyLabels = repeatingCustomer.yearlyRepeatCustomers.map(
    (customer) => `${customer._id.year}-${customer._id.month}`
  );
  const yearlyData = repeatingCustomer.yearlyRepeatCustomers.map(
    (customer) => customer.repeatCustomers
  );

  const yearlyRepeatChart = {
    labels: yearlyLabels,
    datasets: [
      {
        label: "Monthly repeated Customer",
        data: yearlyData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };
  return (
    <div className="w-[400px] md:w-[600px] bg-white rounded-lg  shadow-md p-4  ">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">Number of Repeat Customers</h2>

      {selectChart === "dailyRepeatChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">
            Daily Repeated Customer
          </h3>
          <Line data={dailyRepeatChart} />
        </div>
      )}

      {selectChart === "monthlyRepeatChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">
            Monthly Repeated Customer
          </h3>
          <Line data={monthlyRepeatChart} />
        </div>
      )}

      {selectChart === "quarterlyRepeatChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">
            Quarterly Repeated Customer
          </h3>
          <Line data={quarterlyRepeatChart} />
        </div>
      )}

      {selectChart === "yearlyRepeatChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">
            Yearly Repeated Customer
          </h3>
          <Line data={yearlyRepeatChart} />
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#000]"></span>
          <button
            onClick={() => setSelectChart("dailyRepeatChart")}
            className={`${
              selectChart === "dailyRepeatChart" ? "active" : "inactive"
            }`}
          >
            Daily
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#4bc0c0]"></span>
          <button
            onClick={() => setSelectChart("monthlyRepeatChart")}
            className={`${
              selectChart === "monthlyRepeatChart" ? "active" : "inactive"
            }`}
          >
            Monthly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#ffce56]"></span>
          <button
            onClick={() => setSelectChart("quarterlyRepeatChart")}
            className={`${
              selectChart === "quarterlyRepeatChart" ? "active" : "inactive"
            }`}
          >
            Quarterly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#9966ff]"></span>
          <button
            onClick={() => setSelectChart("yearlyRepeatChart")}
            className={`${
              selectChart === "yearlyRepeatChart" ? "active" : "inactive"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepaeatingCustomer;
