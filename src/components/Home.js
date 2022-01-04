import React, { useState } from "react";
import "../css/App.css";
import "../css/Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Home = (props) => {
  const [search, setSearch] = useState("");
  const [isShown, setIsShown] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredStocks = props.data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="stock-search">
        <h1 className="search-header">Search</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="main-container">
        {filteredStocks.map((stock) => {
          return (
            <div key={stock.id} className="bar-container">
              <div
                className="view"
                onClick={() =>
                  props.getChartData(stock, stock.price_change_percentage_24h)
                }
              >
                View
              </div>
              <div className="bar-img">
                <img src={stock.image} alt="crypto" />
              </div>
              <div className="stock-name">
                <h1>{stock.name}</h1>
                <div className="sym-container" onClick={() => props.add(stock)}>
                  <p className="bar-symbol">{stock.symbol}</p>
                  <FontAwesomeIcon icon={faPlus} className="plus btn" />
                  <p className="plus">Add</p>
                </div>
              </div>

              <div className="bar-data">
                <p className="bar-price">
                  ${stock.current_price.toLocaleString()}
                </p>
                {stock.price_change_percentage_24h != null ? (
                  stock.price_change_percentage_24h < 0.0 ? (
                    <p className="bar-percent red">
                      {stock.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="coin-percent green">
                      {stock.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )
                ) : (
                  "No Change"
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
