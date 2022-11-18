import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './Header.scss';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Search } from '../Search/Search';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <AppBar
        position="static"
        color="secondary"
      >
        <Container
          sx={{
            width: "970px",
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h4"
              component="span"
            // sx={{
            //   flexGrow: 1,
            // }}
            >
              Mui-Shop
            </Typography>

            <Search />

            <IconButton
              color="inherit"
              size="medium"
            >
              <ShoppingCartTwoToneIcon
                fontSize="large"
              />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}
