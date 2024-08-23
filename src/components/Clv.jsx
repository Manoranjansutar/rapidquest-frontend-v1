import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Clv = () => {
  const [cohortData, setCohortData] = useState([]);
  const url = "https://reapidquest-backend.onrender.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/customer-cohorts"
        );
        setCohortData(response.data);
      } catch (error) {
        console.error("Error fetching cohort data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: cohortData.map((cohort) => cohort.cohort),
    datasets: [
      {
        label: "Cohort LTV",
        data: cohortData.map((cohort) => cohort.ltv),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Customer Count",
        data: cohortData.map((cohort) => cohort.customerCount),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Customer Cohort LTV and Count",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-[400px] md:w-[600px] ">
      <h2 className="mb-2 text-xl font-semibold md:text-2xl">
        Customer Lifetime Value by Cohorts
      </h2>
      {cohortData.length > 0 ? (
        <div>
          <Line data={chartData} options={options} className="w-[600px]" />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Clv;
