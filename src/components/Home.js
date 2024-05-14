import React, { useEffect, useState } from "react";
import "../css/App.css";
import "../css/Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import StockCard from "./StockCard";
import ListHeader from "./ListHeader";


export const Home = ({ data }) => {
  const [value, setValue] = useState("");
  const [isShown, setIsShown] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const filteredStocks = data.filter((coin) =>
    coin.name.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {

  }, [filteredStocks])

  return (
    <>
      <Box
        textAlign={'center'}
        zIndex={1}
      >
        <Typography variant="h4" fontWeight={500} color={'white'} marginBottom={'20px'}
          sx={{
            borderBottom: '1px solid orange'
          }}
        >
          Search Coins
        </Typography>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5
          }}
        >
          <TextField
            variant="standard"
            placeholder="Coin..."
            size="small"
            InputProps={{
              style: {
                color: 'white',
                padding: '5px 10px'
              }
            }}
            sx={{
              background: "rgba(255, 255, 255, 0.09)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: 'white',
              marginBottom: '10px',
            }}
            value={value}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Typography variant="subtitle2" color={'white'}>
          Data provided by:
          <a
            href="https://www.coingecko.com/en/api"
            target="_blank"
            style={{
              color: 'orange',
              marginLeft: '5px'
            }}
          >
            CoinGecko
          </a>
        </Typography>
      </Box>



      <Container>
        {/* <Divider
          variant="middle"
          sx={{
            marginBottom: '40px'
          }}
          color={'orange'}
        /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          <ListHeader />
          <Box
            sx={{
              maxHeight: '600px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                width: '5px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888', // Color of the scrollbar thumb
                borderRadius: '10px', // Rounded corners
              },
              scrollbarWidth: 'thin', // Fallback for Firefox
              scrollbarColor: 'orange transparent', // Color of the scrollbar (thumb, track)
            }}
          >
            {filteredStocks.map(stock => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </Box>

        </Box>

        {/* {filteredStocks.map((stock) => {
          <StockCard key={stock.id} stock={stock} />
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

              <div className="stock-name">
                <div className="bar-img">
                  <img src={stock.image} alt="crypto" />
                </div>
                <h1>{stock.name}</h1>
              </div>
              {props.watchlist.indexOf(stock) === -1 ? (
                <div className="sym-container" onClick={() => props.add(stock)}>
                  <p className="bar-symbol">{stock.symbol}</p>
                  <FontAwesomeIcon icon={faPlus} className="plus btn" />
                  <p className="plus">Add</p>
                </div>
              ) : (
                <div
                  className="sym-container"
                  onClick={() => props.remove(stock)}
                >
                  <p className="bar-symbol">{stock.symbol}</p>
                  <FontAwesomeIcon className="minus btn" icon={faMinus} />
                  <p className="minus">Remove</p>
                </div>
              )}

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
        })} */}
      </Container>

    </>
  );
};

export default Home;
