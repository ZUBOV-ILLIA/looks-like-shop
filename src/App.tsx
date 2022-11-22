import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { RootState } from './redux/store/store';

export const App: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />

        {!!categories.length && (
          categories.map((el: string) => (
            <Route key={el} path={el} element={<h2>{el.toUpperCase()}</h2>} />
          ))
        )}


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
