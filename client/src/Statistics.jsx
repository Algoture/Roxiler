import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMonthName } from "./utils";
const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/statistics/${month}`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    if (month) {
      fetchStatistics();
    }
  }, [month]);

  return (
    <div className="stats">
      <h1>Statistics - {getMonthName(month)}</h1>
      <div className="statistics-container">
        <div className="statistics-box">
          <p>
            <strong>Total Sale </strong> 
            {statistics.totalSaleAmount.toFixed(2)}
          </p>
          <p>
            <strong>Total Sold Items:</strong> {statistics.totalSoldproducts}
          </p>
          <p>
            <strong>Total Not Sold Items:</strong>{" "}
            {statistics.totalNotSoldproducts}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
