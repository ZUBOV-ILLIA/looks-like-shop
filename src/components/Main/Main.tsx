import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Main.scss';
// import products from '../../api/products.json';
import { Product } from '../../types/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { Search } from '../Search/Search';
import { getProductsFromAPI } from '../../api/getProductsFromAPI';
import { PromiseProducts } from '../../react-app-env';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';

export const Main: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res: PromiseProducts = await getProductsFromAPI;

      setProducts(res.products);
      dispatch(setProducts(res.products));
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="main">
      <div className="container"
        style={{
          marginTop: "10px",
        }}
      >

        <Search />

        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "25px",
            columnGap: "5px",
            justifyContent: "space-between"
          }}
        >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </div>
    </main>
  )
}
