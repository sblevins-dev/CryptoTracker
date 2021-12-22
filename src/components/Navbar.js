import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { WatchList } from "./WatchList";
import "../css/App.css";

export const Navbar = (props) => {
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
      setGraphData(newData)
      console.log(newData)
    }
  };


  return (
    <div>
      <nav className="navbar-container">
        <ul className="nav">
          <li>
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="nav-links">
              Watch-List
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          exact path="/"
          element={
            <Home data={props.data} add={addCoin} getChartData={getChartData} />
          }
        />
        <Route
          path="watchlist"
          element={
            <WatchList data={list} remove={removeCoin} />
          }
        />
      </Routes>
    </div>
  );
};
