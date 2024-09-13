import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { SingleProduct } from "./components/SingleProduct/SingleProduct";
import { categories } from "./Routes/categories";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="products/:params" element={<SingleProduct />} />

        {!!categories.length &&
          categories.map((el: string) => (
            <Route key={el} path={el} element={<Layout />} />
          ))}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
