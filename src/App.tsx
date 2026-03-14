import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { SingleProduct } from "./components/SingleProduct/SingleProduct";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/slices/categoriesSlice";
import { AppDispatch } from "./redux/store/store";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="products/:params" element={<SingleProduct />} />
        <Route path=":category" element={<Layout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
