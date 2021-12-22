import React, { useState } from "react";
import { WatchList } from "./WatchList";
import '../css/Stock.css';

export const Stock = ({
  name,
  image,
  symbol,
  price,
  priceChange,
}) => {

  return (
      <div className="bar-container" >
        <div className="bar-img">
          <img src={image} alt="crypto" />
        </div>
        <div className="stock-name">
          <h1>{name}</h1>
          <p className="bar-symbol">{symbol}</p>
        </div>
        <div className="bar-data">
          <p className="bar-price">${price}</p>
          {priceChange != null ? (
            priceChange < 0 ? (
              <p className="bar-percent red">{priceChange.toFixed(2)}%</p>
            ) : (
              <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
            )
          ) : (
            "No Change"
          )}
        </div>
      </div>
  );
};
