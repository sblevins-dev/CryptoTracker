import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { WatchList } from "./components/WatchList";

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [graphData, setGraphData] = useState([]);

  function addCoin(newCoin) {
    if (!list.includes(newCoin)) {
      setList((oldList) => [...oldList, newCoin]);
    }
  }

  function removeCoin(coin) {
    setList(list.filter((item) => item.id != coin.id));
  }

  let newData = [];
  const getChartData = async (coin) => {
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
      } catch (err) {
        console.log(err);
      }
      setGraphData(newData);
      console.log(newData);
    }
  };

  // const url = "https://jsonplaceholder.typicode.com/users";
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

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
      <HashRouter>
        <Navbar data={data} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home data={data} add={addCoin} getChartData={getChartData} />
            }
          />
          <Route
            path="watchlist"
            element={<WatchList data={list} remove={removeCoin} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
