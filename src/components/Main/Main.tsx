import { Box, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Main.scss';
import { Product } from '../../types/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { Search } from '../Search/Search';
import { getProductsFromAPI } from '../../api/getProductsFromAPI';
import { PromiseProducts } from '../../react-app-env';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';
import { ItemsPerPageSelector } from '../ItemsPerPageSelector/ItemsPerPageSelector';
import { SortBy } from '../SortBy/SortBy';
import { sorting } from '../../utils/sorting';
import { useLocation } from 'react-router-dom';
import { setPage } from '../../redux/slices/pageSlice';

export const Main: React.FC = () => {
  const productsFromRedux = useSelector((state: RootState) => state.products.products);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [productsToRender, setProductsToRender] = useState([]);
  const [pages, setPages] = useState(1);
  const { page } = useSelector((state: RootState) => state.page);
  const [sortBy, setSortBy] = useState('');
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const liftingQuery = (arg: string) => {
    setQuery(arg);
  };

  const liftingSortBy = (arg: string) => {
    setSortBy(arg);
  };

  const liftingItemsPerPage = (arg: number) => {
    setItemsPerPage(arg);
  };

  const getProducts = async (arg: string) => {
    let queryLocation = '';
    let search = '';

    if (location.pathname !== '/') {
      queryLocation = '/category' + location.pathname;
    }

    try {
      let res: PromiseProducts;

      if (arg !== '') {
        search = '/search?q=' + arg;
        res = await getProductsFromAPI(
          `${search}&limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
        );
      } else {
        res = await getProductsFromAPI(
          `${queryLocation}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
        );
      }

      setPages(Math.ceil(res.total / itemsPerPage));
      dispatch(setProducts(res.products));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getProducts('');
  }, [itemsPerPage, page, location.pathname]);


  useEffect(() => {
    sorting(productsFromRedux, sortBy, setProductsToRender);
  }, [sortBy, itemsPerPage, page, productsFromRedux]);

  return (
    <main className="main">
      <div className="container"
        style={{
          margin: "20px auto",
        }}
      >
        <Search
          query={query}
          liftingQuery={liftingQuery}
          getProducts={getProducts}
        />

        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <SortBy sortBy={sortBy} liftingSortBy={liftingSortBy} />

          <Pagination
            color="secondary"
            count={pages}
            page={page}
            onChange={(_, num) => {
              dispatch(setPage(num));
            }}
          />

          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            liftingItemsPerPage={liftingItemsPerPage}
          />
        </Box>

        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "25px",
            columnGap: "5px",
            justifyContent: "center"
          }}
        >
          {productsToRender.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </div>
    </main>
  );
};
