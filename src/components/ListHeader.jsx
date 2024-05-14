import { Box, Typography } from '@mui/material'
import React from 'react'

const ListHeader = () => {
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
            }}
        >
            <Typography variant="subtitle1" minWidth={"40px"} textAlign={'center'}>
                Rank
            </Typography>
            <Typography variant="subtitle1" textAlign={'left'} minWidth={'300px'}>
                Coin
            </Typography>

            <Typography variant='body1' minWidth={'100px'} textAlign={'right'}>
                Price
            </Typography>

            <Typography variant='body1' minWidth={'100px'} textAlign={'right'}

            >
                24h
            </Typography>

            <Typography variant='body1' textAlign={'right'} minWidth={'200px'}>
                Market Cap
            </Typography>
        </Box>
    )
}

export default ListHeader