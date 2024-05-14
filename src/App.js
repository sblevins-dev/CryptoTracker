import "./css/App.css";
import React, { useState, useEffect } from "react";
// import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { WatchList } from "./components/WatchList";
import coinGecko from "./api/coinGecko";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from "@mui/material";
import Header from "./components/Header";
import StockDetails from "./components/StockDetails";


function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [graphData, setGraphData] = useState();
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
          // coinGecko.get(`/${coin.id}/market_chart/`, {
          //   params: {
          //     vs_currency: "usd",
          //     days: "7",
          //   },
          // }),
          // coinGecko.get(`/${coin.id}/market_chart/`, {
          //   params: {
          //     vs_currency: "usd",
          //     days: "365",
          //   },
          // }),
        ]);
        setGraphData({
          day: formatData(day.data.prices),
          // week: formatData(week.data.prices),
          // year: formatData(year.data.prices),
          detail: `${coin.id}`
        });
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
    // console.log(data)
  }, []);

  return (
    <Box
      className="App"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        background: "#000220",
        background: "radial-gradient(circle, rgba(167,121,17,1) 0%, rgba(100,73,255,1) 0%, rgba(0,1,19,1) 73%, rgba(0,2,32,1) 87%, rgba(0,1,22,1) 100%, rgba(0,1,19,1) 100%, rgba(89,60,20,1) 100%, rgba(146,98,20,1) 100%, rgba(255,168,0,1) 100%)",
        overflow: 'hidden',
        maxHeight: '100vh',
        minHeight: '100vh',
        "&::before": {
          position: 'fixed',
          content: '""',
          bottom: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }
      }}
    >
      {/* <Navbar data={data} /> */}
      {/* <div className="chart-container">
        <Chart data={graphData} name={coinName} isPos={isBool} />
      </div> */}
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home data={data} watchlist={list} remove={removeCoin} add={addCoin} getChartData={getChartData} />
          }
        />
        <Route 
          path="/details"
          element={
            <StockDetails getChartData={getChartData} data={graphData} isPos={isBool} />
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
    </Box>
  );
}

export default App;
