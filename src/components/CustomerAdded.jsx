import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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

const CustomerAdded = () => {
  const url = "https://reapidquest-backend.onrender.com/";
  const [customerAddedData, setCustomerAddedData] = useState({
    dailyAdded: [],
    monthlyAdded: [],
    quarterlyAdded: [],
    yearlyAdded: [],
  });

  const [error, setError] = useState(null);
  const [selectChart, setSelectChart] = useState("monthlyAddedChart");

  useEffect(() => {
    const fetchTotalAddedCustomer = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/customersadded"
        );
        setCustomerAddedData(response.data);
        console.log(response.data);
        console.log(customerAddedData);
      } catch (error) {
        setError(err);
      }
    };
    fetchTotalAddedCustomer();
  }, []);

  // data for daily sales chart
  const dailyLabels = customerAddedData.dailyAdded.map(
    (customer) =>
      `${customer._id.year}-${customer._id.month}-${customer._id.day}`
  );
  const dailyData = customerAddedData.dailyAdded.map(
    (customer) => customer.count
  );

  const dailyAddedChart = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Added Customer",
        data: dailyData,
        borderColor: "#000",
        backgroundColor: "#000",
      },
    ],
  };

  // data for monthly sales chart
  const monthlyLabels = customerAddedData.monthlyAdded.map(
    (customer) => `${customer._id.year}-${customer._id.month}`
  );
  const monthlyData = customerAddedData.monthlyAdded.map(
    (customer) => customer.count
  );

  const monthlyAddedChart = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Added Customer",
        data: monthlyData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192)",
      },
    ],
  };
 

  //data for quarterly sales chart
  const quarterlyLabels = customerAddedData.quarterlyAdded.map(
    (customer) => `Q${customer._id.quarter}-${customer._id.year}`
  );
  const quarterlyData = customerAddedData.quarterlyAdded.map(
    (customer) => customer.count
  );

  const quarterlyAddedChart = {
    labels: quarterlyLabels,
    datasets: [
      {
        label: "Quarterly Added Customer",
        data: quarterlyData,
        backgroundColor: "rgba(255, 206, 86)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };
  

  // data for yearly sales chart
  const yearlyLabels = customerAddedData.yearlyAdded.map(
    (customer) => customer._id.year
  ); 
  const yearlyData = customerAddedData.yearlyAdded.map(
    (customer) => customer.count
  );

  const yearlyAddedChart = {
    labels: yearlyLabels.map((yearObj) => yearObj),
    datasets: [
      {
        label: "Yearly Added Customer",
        data: yearlyData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255,1)",
      },
    ],
  };

  return (
    <div className="w-[400px] md:w-[600px] bg-white rounded-lg  shadow-md p-4">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">New Customers Added Over Time</h2>

      {selectChart === "dailyAddedChart" ? (
        <div className="mb-8 ">
          <h3 className="mb-2 text-xl font-semibold">Daily Customer Added</h3>
          <Bar data={dailyAddedChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "monthlyAddedChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Monthly Customer Added</h3>
          <Line data={monthlyAddedChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "quarterlyAddedChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">
            Quarterly Customer Added
          </h3>
          <Line data={quarterlyAddedChart} />
        </div>
      )}

      {selectChart === "yearlyAddedChart" && (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Yearly Customer Added</h3>
          <Line data={yearlyAddedChart} />
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#000]"></span>
          <button
            onClick={() => {
              setSelectChart("dailyAddedChart");
            }}
            className={`${
              selectChart === "dailyAddedChart" ? "active" : "inactive"
            }`}
          >
            Daily{" "}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#4bc0c0]"></span>
          <button
            onClick={() => {
              setSelectChart("monthlyAddedChart");
            }}
            className={`${
              selectChart === "monthlyAddedChart" ? "active" : "inactive"
            }`}
          >
            Monthly{" "}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#ffce56]"></span>
          <button
            onClick={() => setSelectChart("quarterlyAddedChart")}
            className={`${
              selectChart === "quarterlyAddedChart" ? "active" : "inactive"
            }`}
          >
            Quarterly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#9966ff]"></span>
          <button
            onClick={() => setSelectChart("yearlyAddedChart")}
            className={`${
              selectChart === "yearlyAddedChart" ? "active" : "inactive"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdded;
