import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
