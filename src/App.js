import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { WatchList } from "./components/WatchList";
import { Chart } from "./components/Chart";
import coinGecko from "./api/coinGecko";

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [graphData, setGraphData] = useState({});
  const [coinName, setCoinName] = useState("");
  const [isBool, setIsBool] = useState(true);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  // Add coin to watchlist
  function addCoin(newCoin) {
    if (!list.includes(newCoin)) {
      setList((oldList) => [...oldList, newCoin]);
      alert("Added to Watch-List");
    }
  }

  // Remove coin from watchlist
  function removeCoin(coin) {
    setList(list.filter((item) => item.id != coin.id));
    alert("Removed from Watch-List");
  }

  //function to fetch price data from coin clicked
  const getChartData = async (coin, price) => {
    if (coin != undefined) {
      try {
        const [day, week, year] = await Promise.all([
          coinGecko.get(`/${coin.id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "1",
            },
          }),
          coinGecko.get(`/${coin.id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "7",
            },
          }),
          coinGecko.get(`/${coin.id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "365",
            },
          }),
        ]);
        setGraphData({
          day: formatData(day.data.prices),
          week: formatData(week.data.prices),
          year: formatData(year.data.prices),
          detail: `${coin.id}`
        });
        // const res = await fetch(chartUrl);
        // const data = await res.json();
        // console.log(data)
        // setGraphData(data.prices)
        // data.prices.map((month, index) => {
        //   if (index % 30 == 0) {
        //     newData.push(month);
        //   }
        // });
        // newData.push(data.prices[data.prices.length - 1]);
      } catch (err) {
        console.log(err);
      }
      setCoinName(coin.id);
      if (price < 0.0) {
        setIsBool(false);
      } else {
        setIsBool(true);
      }
    }
  };

  // Get coin list
  const getCoinList = async () => {
    const res = await coinGecko.get("/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: "50",
        page: "1",
        sparkline: "false",
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    // Call for coin list on page load
    getCoinList();
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
            <Home data={data} watchlist={list} remove={removeCoin} add={addCoin} getChartData={getChartData} />
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
