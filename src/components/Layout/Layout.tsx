import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { Main } from "../Main/Main";

export const Layout: React.FC = () => {
  return (
    <>
      <LanguageSelector />
      <Header />
      <Main />
      <Footer />
    </>
  );
};
