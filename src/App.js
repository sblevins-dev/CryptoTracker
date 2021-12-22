import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  // const url = "https://jsonplaceholder.typicode.com/users";
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


  const getCoinData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getCoinData()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar data={data}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
