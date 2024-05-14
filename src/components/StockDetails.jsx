import { Container, Button, Box, Typography, Divider } from '@mui/material';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Chart } from './Chart';

const StockDetails = ({ getChartData, data, isPos }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const stock = location.state;

    console.log(stock)
    console.log(data)

    useEffect(() => {
        // if (data == undefined || data == null) {
        //     getChartData(stock, stock.price_change_percentage_24h)
        // }

    }, [data])

    const handleClick = () => {
        navigate("/")
    }

    return (
        <Container
            sx={{
                zIndex: 1,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                marginBottom: '20px',
                gap: 2,
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    width: '5px', // Width of the scrollbar
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888', // Color of the scrollbar thumb
                    borderRadius: '10px', // Rounded corners
                },
                scrollbarWidth: 'thin', // Fallback for Firefox
                scrollbarColor: '#cc9200 transparent', // Color of the scrollbar (thumb, track)
            }}
        >
            <Button variant="contained"
                sx={{
                    width: 'max-content',
                    backgroundColor: "#cc9200",
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: "#cc9200"
                    }
                }}
                onClick={handleClick}
            >
                Back
            </Button>
            <Box
                p={2}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 6,
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
            >
                <Box
                    flexGrow={1}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: { xs: '100%', sm: '400px' },
                        width: { xs: '100%', sm: '400px' },
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <img src={stock.image} height={'50px'} width={'50px'} />
                        <Typography variant="h3">
                            {stock.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            {stock.symbol}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >

                        <Typography variant='body1'>
                            {stock.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Typography>

                        <Typography variant='body1'
                            color={
                                stock.market_cap_change_percentage_24h > 0
                                    ? 'green'
                                    : 'red'
                            }
                        >
                            {stock.market_cap_change_percentage_24h.toFixed(1) + '%'}
                        </Typography>


                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            Market Cap
                        </Typography>
                        <Typography variant='body1'>
                            {stock.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            Fully Diluted Valuation
                        </Typography>
                        <Typography variant='body1'>
                            {stock.fully_diluted_valuation
                                .toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            24 Hour Trading Volume
                        </Typography>
                        <Typography variant='body1'>
                            {stock.total_volume
                                .toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            Circulating Supply
                        </Typography>
                        <Typography variant='body1'>
                            {stock.circulating_supply.toLocaleString()}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            Total Supply
                        </Typography>
                        <Typography variant='body1'>
                            {stock.total_supply.toLocaleString()}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant='body1'>
                            Max Supply
                        </Typography>
                        <Typography variant='body1'>
                            {stock.max_supply.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                {/* <Divider orientation='vertical'
                    variant='middle'
                    color={'orange'}
                    // sx={{
                    //     color: 'white',
                    //     backgroundColor: 'white',
                    //     width: '4px'
                    // }}
                /> */}

                <Box
                    flexGrow={2}
                    sx={{
                        position: 'relative',
                        height: '100%',
                        maxWidth: '600px',
                        width: { xs: '100%' }
                    }}
                >
                    {
                        (data != null | data != undefined)
                            ? <Chart data={data} name={stock.name} isPos={isPos} />
                            : ""
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default StockDetails