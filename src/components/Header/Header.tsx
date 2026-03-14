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
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import "./Header.scss";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Cart } from "../Cart/Cart";
import { Wishlist } from "../Wishlist/Wishlist";
import { langSetter } from "../../utils/langSetter";
import { setPage } from "../../redux/slices/pageSlice";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { formatCategoryName } from "../../utils/formatCategoryName";
import { toggleTheme } from "../../redux/slices/themeSlice";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const basket = useSelector((state: RootState) => state.basket.basket);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { lang } = useSelector((state: RootState) => state.lang);
  const theme = useSelector((state: RootState) => state.theme.theme);
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
          backgroundColor: "var(--color-bg-surface)",
          color: "var(--color-text-primary)",
          boxShadow: "0 1px 3px var(--color-shadow)",
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
                  color: "var(--color-text-primary)",
                  textTransform: "none",
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "var(--color-accent-blue)",
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
                color: "var(--color-text-primary)",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "var(--color-accent-blue)",
                  backgroundColor: "transparent",
                },
              }}
            >
              {langSetter("headerCategories")}
            </Button>

            <div className="header__nav-container">
              <LanguageSelector />
              <Tooltip title={langSetter("themeToggle")} arrow>
                <IconButton
                  size="medium"
                  onClick={() => dispatch(toggleTheme())}
                  aria-label={langSetter("themeToggle")}
                  sx={{
                    color: "var(--color-text-primary)",
                    "&:hover": {
                      color: "var(--color-accent-blue)",
                    },
                  }}
                >
                  {theme === 'light' ? <DarkModeOutlinedIcon fontSize="medium" /> : <LightModeOutlinedIcon fontSize="medium" />}
                </IconButton>
              </Tooltip>
              <IconButton
                size="medium"
                sx={{
                  color: "var(--color-text-primary)",
                  "&:hover": {
                    color: "var(--color-accent-red)",
                  },
                }}
                onClick={() => setWishlistOpen(true)}
              >
                <Badge
                  badgeContent={wishlistItems.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "var(--color-accent-red)",
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
                  color: "var(--color-text-primary)",
                  "&:hover": {
                    color: "var(--color-accent-blue)",
                  },
                }}
                onClick={() => setDrawerIsOpen(true)}
              >
                <Badge
                  badgeContent={basket.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "var(--color-accent-blue)",
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
            backgroundColor: "var(--color-bg-surface)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "16px 20px",
            borderBottom: "1px solid var(--color-border-light)",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
            }}
          >
            {langSetter("headerCategories")}
          </Typography>
          <IconButton onClick={() => setMenuOpen(false)} size="small" sx={{ color: "var(--color-text-tertiary)" }}>
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
                "&:hover": { backgroundColor: "var(--color-bg-secondary)" },
              }}
            >
              <ListItemText
                primary={langSetter("allcategories")}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-text-primary)",
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
                  "&:hover": { backgroundColor: "var(--color-bg-secondary)" },
                }}
              >
                <ListItemText
                  primary={langSetter(slug) || formatCategoryName(slug)}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
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
