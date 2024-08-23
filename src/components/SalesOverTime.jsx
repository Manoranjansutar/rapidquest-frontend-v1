import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

const SalesGrowthChart = () => {
  const url = "https://reapidquest-backend.onrender.com/";
  const [growthRates, setGrowthRates] = useState({
    dailyGrowthRates: [],
    monthlyGrowthRates: [],
    quarterlyGrowthRates: [],
    yearlyGrowthRates: [],
  });
  const [selectChart, setSelectChart] = useState("monthlyGrowthRateChart");

  useEffect(() => {
    const fetchGrowthRates = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/salesovertime"
        );
        console.log("API Response:", response.data);
        setGrowthRates(response.data);
        console.log("Yearly Growth Rates:", growthRates.yearlyGrowthRates);
      } catch (error) {
        console.error("Error fetching growth rates:", error);
      }
    };
    fetchGrowthRates();
  }, []);

  if (
    !growthRates.dailyGrowthRates ||
    !growthRates.monthlyGrowthRates ||
    !growthRates.quarterlyGrowthRates ||
    !growthRates.yearlyGrowthRates
  ) {
    return <div>Loading...</div>;
  }

  //data for daily sales growth chart
  const dailyLabels = growthRates.dailyGrowthRates.map((rate) => {
    if (
      rate.period &&
      rate.period.year &&
      rate.period.month &&
      rate.period.day
    ) {
      return `${rate.period.year}-${rate.period.month}-${rate.period.day}`;
    }
    return "Unknown Date";
  });
  const dailyData = growthRates.dailyGrowthRates.map((rate) =>
    parseFloat(rate.growthRate)
  );

  const dailyGrowthRateChart = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Growth Rate",
        data: dailyData,
        borderColor: "#000",
        backgroundColor: "#000",
      },
    ],
  };

  // Prepare data for monthly sales growth chart
  const monthlyLabels = growthRates.monthlyGrowthRates.map((rate) => {
    if (rate._id && rate._id.year && rate._id.month) {
      return `${rate._id.year}-${rate._id.month}`;
    }
    return "Unknown Month";
  });
  const monthlyData = growthRates.monthlyGrowthRates.map((rate) =>
    parseFloat(rate.growthRate)
  );

  const monthlyGrowthRateChart = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Growth Rate",
        data: monthlyData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  // Prepare data for quarterly sales growth chart
  const quarterlyLabels = growthRates.quarterlyGrowthRates.map((rate) => {
    if (rate.period && rate.period.quarter && rate.period.year) {
      const quarterLabel = `Q${rate.period.quarter}`;
      return `${quarterLabel}-${rate.period.year}`;
    }
    return "Unknown Quarter";
  });
  const quarterlyData = growthRates.quarterlyGrowthRates.map((rate) =>
    parseFloat(rate.growthRate)
  );

  const quarterlyGrowthRateChart = {
    labels: quarterlyLabels,
    datasets: [
      {
        label: "Quarterly Growth Rate",
        data: quarterlyData,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  // data for yearly sales growth chart
  const yearlyLabels = growthRates.yearlyGrowthRates.map((rate) => {
    if (rate.period) {
      return `Year ${rate.period}`;
    }
    return "Unknown Year";
  });
  const yearlyData = growthRates.yearlyGrowthRates.map((rate) =>
    parseFloat(rate.growthRate)
  );

  const yearlyGrowthRateChart = {
    labels: yearlyLabels,
    datasets: [
      {
        label: "Yearly Growth Rate",
        data: yearlyData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  return (
    <div className="w-[400px] md:w-[600px] bg-white rounded-lg  shadow-md p-4">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">Sales Growth Rate Over Time</h2>
      {selectChart === "dailyGrowthRateChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Daily Growth rate</h3>
          <Bar data={dailyGrowthRateChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "monthlyGrowthRateChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Monthly Growth Rate</h3>
          <Line data={monthlyGrowthRateChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "quarterlyGrowthRateChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Quarterly Growth Rate</h3>
          <Line data={quarterlyGrowthRateChart} />
        </div>
      ) : (
        ""
      )}

      {selectChart === "yearlyGrowthRateChart" ? (
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Yearly Growth Rate</h3>
          <Bar data={yearlyGrowthRateChart} />
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#000]"></span>
          <button
            onClick={() => setSelectChart("dailyGrowthRateChart")}
            className={`${
              selectChart === "dailyGrowthRateChart" ? "active" : "inactive"
            }`}
          >
            Daily
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#4bc0c0]"></span>
          <button
            onClick={() => setSelectChart("monthlyGrowthRateChart")}
            className={`${
              selectChart === "monthlyGrowthRateChart" ? "active" : "inactive"
            }`}
          >
            Monthly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#ffce56]"></span>
          <button
            onClick={() => setSelectChart("quarterlyGrowthRateChart")}
            className={`${
              selectChart === "quarterlyGrowthRateChart" ? "active" : "inactive"
            }`}
          >
            Quarterly
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#9966ff]"></span>
          <button
            onClick={() => setSelectChart("yearlyGrowthRateChart")}
            className={`${
              selectChart === "yearlyGrowthRateChart" ? "active" : "inactive"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesGrowthChart;
