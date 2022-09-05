import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { dataOptions } from "../chartConfigs/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const Chart = ({ data, isPos }) => {
  const { day, week, year, detail } = data;
  const [col, setColor] = useState("");
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (isPos) {
      setColor("#00c629");
    } else {
      setColor("#ff2d2d");
    }
  }, [timeFormat]);

  let dataSet = {
    type: "line",
    datasets: [
      {
        label: `${detail}`,
        data: determineTimeFormat(),
        borderColor: `${col}`,
        backgroundColor: `${col}`,
        pointRadius: 2,
      },
    ],
  };

  return (
    <>
      <Line options={dataOptions} data={dataSet} />
      <div className="chart-buttons">
        <button className="btn-day" onClick={() => setTimeFormat("24h")}>
          24h
        </button>
        <button className="btn-week middle" onClick={() => setTimeFormat("7d")}>
          7d
        </button>
        <button className="btn-year" onClick={() => setTimeFormat("1y")}>
          1y
        </button>
      </div>
    </>
  );
};
