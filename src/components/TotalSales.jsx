import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalSales = () => {
  const url = "https://reapidquest-backend.onrender.com/";
  const [salesData, setSalesData] = useState({
    dailySales: [],
    monthlySales: [],
    quarterlySales: [],
    yearlySales: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectChart, setSelectChart] = useState("monthlySalesChart");

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/totalSales"
        );
        setSalesData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalSales();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  //data for daily sales chart
  const dailyLabels = salesData.dailySales.map(
    (sale) => `${sale._id.year}-${sale._id.month}-${sale._id.day}`
  );
  const dailyData = salesData.dailySales.map((sale) => sale.totalPrice);

  const dailySalesChart = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Sales",
        data: dailyData,
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  //data for monthly sales chart
  const monthlyLabels = salesData.monthlySales.map(
    (sale) => `${sale._id.year}-${sale._id.month}`
  );
  const monthlyData = salesData.monthlySales.map((sale) => sale.totalPrice);

  const monthlySalesChart = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Sales",
        data: monthlyData,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  //data for quarterly sales chart
  const quarterlyLabels = salesData.quarterlySales.map(
    (sale) => `Q${sale._id.quarter}-${sale._id.year}`
  );
  const quarterlyData = salesData.quarterlySales.map((sale) => sale.totalPrice);

  const quarterlySalesChart = {
    labels: quarterlyLabels,
    datasets: [
      {
        label: "Quarterly Sales",
        data: quarterlyData,
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  //data for yearly sales chart
  const yearlyLabels = salesData.yearlySales.map((sale) => sale._id);
  const yearlyData = salesData.yearlySales.map((sale) => sale.totalPrice);

  const yearlySalesChart = {
    labels: yearlyLabels,
    datasets: [
      {
        label: "Yearly Sales",
        data: yearlyData,
        backgroundColor: "rgba(153, 102, 255, 1)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[400px] md:w-[600px] bg-white rounded-lg shadow-md p-4">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">Total Sales Over Time</h2>

      {selectChart === "dailySalesChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Daily Sales</h3>
          <Bar data={dailySalesChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "monthlySalesChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Monthly Sales</h3>
          <Bar data={monthlySalesChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "quarterlySalesChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Quarterly Sales</h3>
          <Bar data={quarterlySalesChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "yearlySalesChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Yearly Sales</h3>
          <Bar data={yearlySalesChart} />
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#000]"></span>
          <button
            onClick={() => {
              setSelectChart("dailySalesChart");
            }}
            className={`${
              selectChart === "dailySalesChart" ? "active" : "inactive"
            }`}
          >
            Daily{" "}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#4bc0c0]"></span>

          <button
            onClick={() => {
              setSelectChart("monthlySalesChart");
            }}
            className={`${
              selectChart === "monthlySalesChart" ? "active" : "inactive"
            }`}
          >
            Monthly{" "}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#ffce56]"></span>

          <button
            onClick={() => {
              setSelectChart("quarterlySalesChart");
            }}
            className={`${
              selectChart === "quarterlySalesChart" ? "active" : "inactive"
            }`}
          >
            Quarterly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#9966ff]"></span>

          <button
            onClick={() => {
              setSelectChart("yearlySalesChart");
            }}
            className={`${
              selectChart === "yearlySalesChart" ? "active" : "inactive"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
