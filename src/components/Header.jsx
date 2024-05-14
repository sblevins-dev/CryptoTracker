import { Container, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Container sx={{ zIndex: 1 }}>
            <Typography
                pt={2}
                variant="h4"
                color={'#cc9200'}
                letterSpacing={3}
                fontWeight={400}
            >
                CryptoWatch
            </Typography>
        </Container>
    )
}

export default Header