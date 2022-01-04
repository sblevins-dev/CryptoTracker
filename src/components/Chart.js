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
  registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    color: "green",
    legend: {
      position: "top",
      labels: {
        color: "white",
        fontColor: "white",
      },
    },
    title: {
      display: true,
      text: "Chart.js Coin chart",
      color: "white",
    },
  },
};

const labels = [
  "Jun-2020",
  "Jul-2020",
  "Aug-2020",
  "Sep-2020",
  "Oct-2020",
  "Nov-2020",
  "Dec-2020",
  "Jan-2021",
];

export const Chart = (props) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [col, setColor] = useState("");

  useEffect(() => {
    let priceArr = [];
    props.data.map((price) => {
      priceArr.push(price[1]);
    });
    setData(priceArr);
    setName(props.name);
    graphData.datasets.label = name;
    graphData.datasets.data = data;
    if (props.isPos) {
      setColor("green");
    } else {
      setColor("red");
    }
  }, [props]);

  const graphData = {
    labels,
    datasets: [
      {
        label: name,
        data: data,
        borderColor: `${col}`,
        backgroundColor: `${col}`,
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={graphData} />
    </>
  );
};
