import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { PageNotFound } from "../PageNotFound/PageNotFound";

export const Layout: React.FC = () => {
  const { category } = useParams();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  if (category && !loading && categories.length > 0 && !categories.includes(category)) {
    return (
      <>
        <Header />
        <PageNotFound />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
