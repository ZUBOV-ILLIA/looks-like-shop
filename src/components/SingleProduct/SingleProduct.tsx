import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsFromAPI } from '../../api/getProductsFromAPI';
import { Product } from '../../types/products';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const SingleProduct: React.FC = () => {
  const { params } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const getProduct = async () => {
    try {
      const res: Product = await getProductsFromAPI(`/${params}`);

      setProduct(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Header />

      {product && (
        <main className="single-product">
          <div className="container">
            <img src={product?.thumbnail} alt="" />

            {product.images.map(image => (
              <img key={image} src={image} alt="" />
            ))}
          </div>
        </main>
      )}

      <Footer />
    </>
  );
};
