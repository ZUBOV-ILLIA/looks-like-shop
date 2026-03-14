import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBasketItem } from "../../redux/slices/basketSlice";
import { toggleWishlistItem } from "../../redux/slices/wishlistSlice";
import { RootState } from "../../redux/store/store";
import { Product } from "../../types/products";
import { langSetter } from "../../utils/langSetter";
import "./ProductCard.scss";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { lang } = useSelector((state: RootState) => state.lang);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const discountedPrice =
    product.discountPercentage > 0
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <Box className="product-card">
      <Card className="product-card__inner">
        <Box sx={{ position: "relative" }}>
          <IconButton
            className="product-card__wishlist-btn"
            onClick={() => dispatch(toggleWishlistItem(product))}
            size="small"
          >
            {isWishlisted ? (
              <Favorite sx={{ fontSize: "1.25rem", color: "#ff3b30" }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: "1.25rem", color: "#86868b" }} />
            )}
          </IconButton>
          <Link
            to={"/products/" + product.id}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              component="img"
              height="260"
              image={product.thumbnail}
              alt={product.title}
              sx={{ objectFit: "contain", padding: "16px 16px 0" }}
            />
          </Link>

          <CardContent sx={{ padding: "16px 20px 8px" }}>
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.25}
              size="small"
              readOnly
              sx={{
                fontSize: "0.875rem",
                opacity: 0.7,
              }}
            />
            <Link
              to={"/products/" + product.id}
              style={{ textDecoration: "none" }}
            >
              <Typography
                className="product-card__title"
                variant="subtitle1"
                component="h5"
              >
                {product.title}
              </Typography>
            </Link>
            <Box className="product-card__price">
              {discountedPrice ? (
                <>
                  <Typography
                    variant="body1"
                    component="span"
                    className="product-card__price-current"
                  >
                    ${discountedPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    className="product-card__price-original"
                  >
                    ${product.price}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="body1"
                  component="span"
                  className="product-card__price-current"
                >
                  ${product.price}
                </Typography>
              )}
            </Box>
            <Typography
              variant="body2"
              className="product-card__description"
            >
              {product.description}
            </Typography>
          </CardContent>
        </Box>

        <CardActions sx={{ padding: "8px 20px 16px" }}>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
          >
            <Alert
              variant="filled"
              severity="success"
            >{`${product?.title} added to cart`}</Alert>
          </Snackbar>

          <Button
            className="product-card__add-btn"
            variant="contained"
            disableElevation
            fullWidth
            onClick={() => {
              dispatch(addBasketItem(product));
              setOpen(true);
            }}
          >
            {langSetter("addtocart")}
          </Button>
        </CardActions>
      </Card>
      <Typography sx={{ display: "none" }}>{lang}</Typography>
    </Box>
  );
};
