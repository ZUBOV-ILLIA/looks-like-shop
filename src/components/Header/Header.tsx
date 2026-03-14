import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import "./Header.scss";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Cart } from "../Cart/Cart";
import { Wishlist } from "../Wishlist/Wishlist";
import { langSetter } from "../../utils/langSetter";
import { setPage } from "../../redux/slices/pageSlice";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { formatCategoryName } from "../../utils/formatCategoryName";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const basket = useSelector((state: RootState) => state.basket.basket);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const liftingDrawerIsOpen = (arg: boolean) => {
    setDrawerIsOpen(arg);
  };

  const handleCategoryClick = (slug: string) => {
    setMenuOpen(false);
    dispatch(setPage(1));
    navigate(`/${slug}`);
  };

  const handleAllCategories = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
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
              className="header__nav-item header__categories-btn"
              onClick={() => setMenuOpen(true)}
              startIcon={<MenuIcon />}
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

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: 320 },
            backgroundColor: "#fff",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "16px 20px",
            borderBottom: "1px solid #e5e5e7",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#1d1d1f",
            }}
          >
            {langSetter("headerCategories")}
          </Typography>
          <IconButton onClick={() => setMenuOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pt: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleAllCategories}
              sx={{
                py: 1.5,
                px: 2.5,
                "&:hover": { backgroundColor: "#f5f5f7" },
              }}
            >
              <ListItemText
                primary={langSetter("allcategories")}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#1d1d1f",
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          </ListItem>
          {categories.map((slug) => (
            <ListItem key={slug} disablePadding>
              <ListItemButton
                onClick={() => handleCategoryClick(slug)}
                sx={{
                  py: 1,
                  px: 2.5,
                  "&:hover": { backgroundColor: "#f5f5f7" },
                }}
              >
                <ListItemText
                  primary={langSetter(slug) || formatCategoryName(slug)}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    color: "#6e6e73",
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

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
