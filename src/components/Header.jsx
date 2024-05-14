import { Container, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Container sx={{ zIndex: 1 }}>
            <Typography
                pt={2}
                variant="h3"
                color={'#cc9200'}
                fontFamily={'fantasy'}
                letterSpacing={3}
            >
                Crypton
            </Typography>
        </Container>
    )
}

export default Header