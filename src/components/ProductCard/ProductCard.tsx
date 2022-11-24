import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Snackbar,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBasketItem } from '../../redux/slices/basketSlice';
import { Product } from '../../types/products';
import './ProductCard.scss';


type Props = {
  product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      className="product-card"
      sx={{
        width: "240px",
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link to={"/products/" + product.id} style={{ textDecoration: 'none' }} >
            <CardMedia
              component="img"
              height="220"
              image={product.thumbnail}
              alt="green iguana"
            />
          </Link>


          <CardContent>
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.25}
              size="small"
              readOnly
            />
            <Link
              to={"/products/" + product.id}
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                padding="10px 0"
                color="#ff8208"
                textAlign="left"
                variant="h6"
                component="h5"
              >
                {product.title}
              </Typography>
            </Link>
            <Typography variant="body1">{`Price - ${product.price}$`}</Typography>
            <Typography variant="subtitle2">{product.description}</Typography>
          </CardContent>
        </Box>

        <CardActions>
          <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
            <Alert variant="filled" severity="success">{`${product?.title} added to cart`}</Alert>
          </Snackbar>

          <Button
            color="secondary"
            onClick={() => {
              dispatch(addBasketItem(product));
              setOpen(true);
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
