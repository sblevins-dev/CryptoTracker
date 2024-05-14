import { Box, Typography } from '@mui/material'
import React from 'react'

const StockCard = ({ stock }) => {
    return (
        <Box
            color={'white'}
            sx={{
                minHeight: '50px',
                padding: "20px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                '&:hover': {
                    background: "rgba(255, 255, 255, 0.09)",
                    cursor: 'pointer'
                }
            }}
        >
            <Typography variant="subtitle1" minWidth={"40px"} textAlign={'center'}>
                {stock.market_cap_rank}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: '300px'
                }}
            >
                <img src={stock.image} height={'100%'} width={'50px'} style={{ marginRight: '10px' }} />

                <Typography variant="h6">
                    {stock.name}
                </Typography>

                <Typography variant="subtitle1">
                    {stock.symbol}
                </Typography>
            </Box>

            <Typography variant='body1' minWidth={'100px'} textAlign={'right'}>
                {stock.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>

            <Typography variant='body1' minWidth={'100px'} textAlign={'right'}
                color={
                    stock.market_cap_change_percentage_24h > 0
                        ? 'green'
                        : 'red'
                }
            >
                {stock.market_cap_change_percentage_24h.toFixed(1) + '%'}
            </Typography>

            <Typography variant='body1' textAlign={'right'} minWidth={'200px'}>
                {stock.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </Typography>
        </Box>
    )
}

export default StockCard