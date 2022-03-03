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
  "Jun-2021",
  "Jul-2021",
  "Aug-2021",
  "Sep-2021",
  "Oct-2021",
  "Nov-2021",
  "Dec-2021",
  "Jan-2022",
  "Feb-2022",
  "Mar-2022"
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
