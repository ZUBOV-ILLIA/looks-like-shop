import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Header.scss';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Link, Route, Routes } from 'react-router-dom';
import { getCategoriesFromAPI } from '../../api/getCategoriesFromAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { setCategories } from '../../redux/slices/categoriesSlice';
import { BackdropFilter } from '../BackdropFilter/BackdropFilter';
import { Cart } from '../Cart/Cart';

const body = document.body;

export const Header: React.FC = () => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const basket = useSelector((state: RootState) => state.basket.basket);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const liftingDrawerIsOpen = (arg: boolean) => {
    setDrawerIsOpen(arg);
  }

  const liftingCategoriesVisible = (arg: boolean) => {
    setCategoriesVisible(arg);

    if (arg) {
      body.classList.add('scroll-off');
    } else {
      body.classList.remove('scroll-off');
    }
  }

  const getCategories = async () => {
    try {
      const res: string[] = await getCategoriesFromAPI;

      setCategories(res);
      dispatch(setCategories(res));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, [])

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
              Categories
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
                to={el}
                onClick={() => setCategoriesVisible(false)}
              >
                {el.toUpperCase()}
              </Link>
            ))
          )}
        </nav>
      </div>

      {/* <Routes>
        {!!categories.length && (
          categories.map((el: string) => (
            <Route key={el} path={el} element={<h2>{el.toUpperCase()}</h2>} />
          ))
        )}
      </Routes> */}

      <Cart liftingDrawerIsOpen={liftingDrawerIsOpen} drawerIsOpen={drawerIsOpen} />
    </header>
  )
}
