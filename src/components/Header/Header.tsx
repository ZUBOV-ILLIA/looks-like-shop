import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Header.scss';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { BackdropFilter } from '../BackdropFilter/BackdropFilter';
import { Cart } from '../Cart/Cart';
import { categories } from '../../Routes/categories';
import { langSetter } from '../../utils/langSetter';

const body = document.body;

export const Header: React.FC = () => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const basket = useSelector((state: RootState) => state.basket.basket);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { lang } = useSelector((state: RootState) => state.lang);


  const liftingDrawerIsOpen = (arg: boolean) => {
    setDrawerIsOpen(arg);
  };

  const liftingCategoriesVisible = (arg: boolean) => {
    setCategoriesVisible(arg);

    if (arg) {
      body.classList.add('scroll-off');
    } else {
      body.classList.remove('scroll-off');
    }
  };

  return (
    <header className="header">
      {categoriesVisible && <BackdropFilter liftState={liftingCategoriesVisible} />}

      <AppBar
        position="static"
        color="secondary"
        sx={{
          width: "100% !important",
          minWidth: '778px',
        }}
      >
        <div className="container">
          <Toolbar
            sx={{
              pl: "0 !important",
              pr: "0 !important",
              width: "100%",
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "'Rubik Mono One', sans-serif",
                  fontSize: "2rem",
                  textShadow: "9px 7px 16px #ff02a8, -6px -3px 16px #ff6000",
                  WebkitTextStroke: "2px #ff9200",
                  WebkitTextFillColor: "transparent",
                  textTransform: "uppercase",
                  transition: "0.3s linear",
                  cursor: "pointer",
                  "&:hover": {
                    textShadow: "9px 7px 16px #2d5de3, -6px -3px 16px #0094ff",
                    WebkitTextStroke: "2px #69ff00",
                  }
                }}
              >
                Mui-Shop
              </Typography>
            </Link>

            <Button
              className="header__nav-item"
              onClick={() => liftingCategoriesVisible(true)}
              sx={{
                color: "white",
              }}
            >
              {langSetter("headerCategories")}
            </Button>

            <IconButton
              color="inherit"
              size="medium"
              sx={{
                boxShadow: "0 0 15px #d528f4"
              }}
              onClick={() => setDrawerIsOpen(true)}
            >
              <Badge badgeContent={basket.length} color="primary">
                <ShoppingCartTwoToneIcon
                  fontSize="medium"
                />
              </Badge>
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>

      <div className="container">
        <nav className={`header__nav ${categoriesVisible ? 'header__nav--active' : ''}`}>
          {!!categories.length && (
            categories.map((el: string) => (
              <Link
                key={el}
                className="header__nav-item"
                to={`/${el}`}
                style={{ textTransform: "uppercase"}}
                onClick={() => {
                  liftingCategoriesVisible(false);
                }}
              >
                {langSetter(el)}
              </Link>
            ))
          )}
          <Link
            className="header__nav-item"
            to="/"
            onClick={() => {
              liftingCategoriesVisible(false);
            }}
            style={{
              color: '#000',
              fontWeight: 700,
              textTransform: "uppercase"
            }}

          >
            {langSetter("allcategories")}
          </Link>
        </nav>
      </div>

      <Typography sx={{ display: "none" }}>{lang}</Typography>

      <Cart liftingDrawerIsOpen={liftingDrawerIsOpen} drawerIsOpen={drawerIsOpen} />
    </header>
  );
};
