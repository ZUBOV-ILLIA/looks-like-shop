import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { SingleProduct } from "./components/SingleProduct/SingleProduct";
import { Checkout } from "./components/Checkout/Checkout";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/slices/categoriesSlice";
import { AppDispatch, RootState } from "./redux/store/store";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="products/:params" element={<SingleProduct />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path=":category" element={<Layout />} />
        <Route path="*" element={<><Header /><PageNotFound /><Footer /></>} />
      </Routes>
    </>
  );
};
