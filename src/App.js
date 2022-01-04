import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { WatchList } from "./components/WatchList";
import { Chart } from "./components/Chart";

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [coinName, setCoinName] = useState("");
  const [isBool, setIsBool] = useState(true);

  function addCoin(newCoin) {
    if (!list.includes(newCoin)) {
      setList((oldList) => [...oldList, newCoin]);
      alert("Added to Watch-List");
    }
  }

  function removeCoin(coin) {
    setList(list.filter((item) => item.id != coin.id));
    alert("Removed from Watch-List");
  }

  //Array to hold data returned from coin
  let newData = [];

  //function to fetch price data from coin clicked
  const getChartData = async (coin, price) => {
    let timestamp = Date.now();

    if (coin != undefined) {
      const chartUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=1624407061&to=${timestamp}`;

      try {
        const res = await fetch(chartUrl, { mode: "cors" });
        const data = await res.json();
        data.prices.map((month, index) => {
          if (index % 30 == 0) {
            newData.push(month);
          }
        });
        newData.push(data.prices[data.prices.length - 1]);
      } catch (err) {
        console.log(err);
      }
      setGraphData(newData);
      setCoinName(coin.id);
      if (price < 0.0) {
        setIsBool(false);
      } else {
        setIsBool(true);
      }
    }
  };

  // const url = "https://jsonplaceholder.typicode.com/users";
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  const getCoinData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <div className="App">
      <Navbar data={data} />
      <div className="chart-container">
        <Chart data={graphData} name={coinName} isPos={isBool} />
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home data={data} add={addCoin} getChartData={getChartData} />
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              data={list}
              remove={removeCoin}
              getChartData={getChartData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
