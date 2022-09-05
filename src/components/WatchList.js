import React from "react";
import "../css/App.css";
import "../css/Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export const WatchList = (props) => {
  return (
    <>
      <div className="main-container">
        {props.data.length > 0 ? (
          props.data.map((stock) => {
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
                </div>
                <div
                  className="sym-container"
                  onClick={() => props.remove(stock)}
                >
                  <p className="bar-symbol">{stock.symbol}</p>
                  <FontAwesomeIcon className="minus btn" icon={faMinus} />
                  <p className="minus">Remove</p>
                </div>
                <div className="bar-data">
                  <p className="bar-price">
                    ${stock.current_price.toLocaleString()}
                  </p>
                  {stock.price_change_percentage_24h != null ? (
                    stock.price_change_percentage_24h < 0 ? (
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
          })
        ) : (
          <p>Nothing in list</p>
        )}
      </div>
    </>
  );
};
