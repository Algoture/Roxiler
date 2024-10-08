import React, { useState, useEffect } from "react";
import { getMonthName } from "./utils";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

const BarCharts = ({ month }) => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bar-chart/${month}`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    if (month) {
      fetchBarChartData();
    }
  }, [month]);

  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ],
    datasets: [
      {
        label: "Number of Items",
        data: chartData
          ? [
              chartData["0-100"],
              chartData["101-200"],
              chartData["201-300"],
              chartData["301-400"],
              chartData["401-500"],
              chartData["501-600"],
              chartData["601-700"],
              chartData["701-800"],
              chartData["801-900"],
              chartData["901-above"],
            ]
          : [],
        backgroundColor: "#F9C80E",
        borderColor: "rgba(72, 207, 247, 1)",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: `Price Range for Selected Month (${getMonthName(month)})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="barChartDiv">
      <h1>Bar Chart Stats - {getMonthName(month)}</h1>
      <div className="chart-container">
        {chartData ? (
          <Bar data={data} options={options} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default BarCharts;
