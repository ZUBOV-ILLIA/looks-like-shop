import { Container, Grid } from '@mui/material';
import React from 'react';
import './Main.scss';
import products from '../../api/products.json';
import { Product } from '../../types/products';

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Container
        sx={{
          mt: "20px",
          width: "970px",
        }}
      >
        <Grid container spacing={2}>
          {products.map((product: Product) => (
            <div key={product.id} style={{ border: '1px solid black' }}>
              <img src={product.thumbnail} alt="thumbnail" />
              <h5>{product.title}</h5>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </main>
  )
}
