import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Header.scss";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { BackdropFilter } from "../BackdropFilter/BackdropFilter";
import { Cart } from "../Cart/Cart";
import { Wishlist } from "../Wishlist/Wishlist";
import { categories } from "../../Routes/categories";
import { langSetter } from "../../utils/langSetter";
import { setPage } from "../../redux/slices/pageSlice";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

const body = document.body;

export const Header: React.FC = () => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const basket = useSelector((state: RootState) => state.basket.basket);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

  const liftingDrawerIsOpen = (arg: boolean) => {
    setDrawerIsOpen(arg);
  };

  const liftingCategoriesVisible = (arg: boolean) => {
    setCategoriesVisible(arg);

    if (arg) {
      body.classList.add("scroll-off");
    } else {
      body.classList.remove("scroll-off");
    }
  };

  return (
    <header className="header">
      {categoriesVisible && (
        <BackdropFilter liftState={liftingCategoriesVisible} />
      )}

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#1d1d1f",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="container">
          <Toolbar
            sx={{
              pl: "0 !important",
              pr: "0 !important",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1d1d1f",
                  textTransform: "none",
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#0071e3",
                  },
                }}
              >
                Mui-Shop
              </Typography>
            </Link>

            <Button
              className="header__nav-item"
              onClick={() => liftingCategoriesVisible(true)}
              sx={{
                color: "#1d1d1f",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0071e3",
                  backgroundColor: "transparent",
                },
              }}
            >
              {langSetter("headerCategories")}
            </Button>

            <div className="header__nav-container">
              <LanguageSelector />
              <IconButton
                size="medium"
                sx={{
                  color: "#1d1d1f",
                  "&:hover": {
                    color: "#ff3b30",
                  },
                }}
                onClick={() => setWishlistOpen(true)}
              >
                <Badge
                  badgeContent={wishlistItems.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#ff3b30",
                      color: "#fff",
                    },
                  }}
                >
                  <FavoriteBorderIcon fontSize="medium" />
                </Badge>
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  color: "#1d1d1f",
                  "&:hover": {
                    color: "#0071e3",
                  },
                }}
                onClick={() => setDrawerIsOpen(true)}
              >
                <Badge
                  badgeContent={basket.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#0071e3",
                      color: "#fff",
                    },
                  }}
                >
                  <ShoppingCartTwoToneIcon fontSize="medium" />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <div className="container">
        <nav
          className={`header__nav ${
            categoriesVisible ? "header__nav--active" : ""
          }`}
        >
          {!!categories.length &&
            categories.map((el: string) => (
              <Link
                key={el}
                className="header__nav-item"
                to={`/${el}`}
                style={{ textTransform: "uppercase" }}
                onClick={() => {
                  liftingCategoriesVisible(false);
                  dispatch(setPage(1));
                }}
              >
                {langSetter(el)}
              </Link>
            ))}
          <Link
            className="header__nav-item"
            to="/"
            onClick={() => {
              liftingCategoriesVisible(false);
            }}
            style={{
              color: "#000",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {langSetter("allcategories")}
          </Link>
        </nav>
      </div>

      <Typography sx={{ display: "none" }}>{lang}</Typography>

      <Cart
        liftingDrawerIsOpen={liftingDrawerIsOpen}
        drawerIsOpen={drawerIsOpen}
      />

      <Wishlist
        drawerIsOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </header>
  );
};
