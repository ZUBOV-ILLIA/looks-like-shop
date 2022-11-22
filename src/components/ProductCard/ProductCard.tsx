import { Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
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
          <CardMedia
            component="img"
            height="220"
            image={product.thumbnail}
            alt="green iguana"
          />

          <CardContent>
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.25}
              size="small"
              readOnly
            />
            <Link to={"/products/" + product.id}>
              <Typography textAlign="left" variant="h6" component="h5">{product.title}</Typography>
            </Link>
            <Typography variant="body1">{`Price - ${product.price}$`}</Typography>
            <Typography variant="subtitle2">{product.description}</Typography>
          </CardContent>
        </Box>

        <CardActions>
          <Button
            color="secondary"
            onClick={() => {
              dispatch(addBasketItem(product));
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
