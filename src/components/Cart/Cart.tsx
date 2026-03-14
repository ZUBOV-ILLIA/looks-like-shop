import {
  Drawer,
  IconButton,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Close, DeleteOutline, ShoppingBagOutlined } from '@mui/icons-material';
import { addBasketItem, deleteBasketItem, removeBasketItem } from '../../redux/slices/basketSlice';
import { langSetter } from '../../utils/langSetter';
import { Product } from '../../types/products';
import './Cart.scss';

interface CartProps {
  liftingDrawerIsOpen: (arg: boolean) => void,
  drawerIsOpen: boolean,
}

export const Cart: React.FC<CartProps> = ({ liftingDrawerIsOpen, drawerIsOpen }) => {
  const products = useSelector((state: RootState) => state.basket.basket);
  const dispatch = useDispatch();

  const getDiscountedPrice = (product: Product) => {
    if (product.discountPercentage > 0) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return product.price;
  };

  const totalPrice = products.reduce((prev, el) => prev + (getDiscountedPrice(el) * el.quantity), 0);

  return (
    <Drawer
      open={drawerIsOpen}
      anchor="right"
      onClose={() => liftingDrawerIsOpen(false)}
      PaperProps={{
        sx: { boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.08)' }
      }}
    >
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">{langSetter("product")}</h2>
          <IconButton
            onClick={() => liftingDrawerIsOpen(false)}
            size="small"
            sx={{ color: 'var(--color-text-tertiary)' }}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>

        {products.length > 0 ? (
          <>
            <div className="cart-drawer__items">
              {products.map(product => (
                <div className="cart-drawer__item" key={product.id}>
                  <img
                    className="cart-drawer__item-image"
                    src={product.thumbnail}
                    alt={product.title}
                  />

                  <div className="cart-drawer__item-details">
                    <p className="cart-drawer__item-title">{product.title}</p>
                    <p className="cart-drawer__item-price">${getDiscountedPrice(product).toFixed(2)}</p>
                    <div className="cart-drawer__quantity">
                      <button
                        className="cart-drawer__quantity-btn"
                        disabled={product.quantity === 1}
                        onClick={() => dispatch(removeBasketItem(product))}
                      >
                        −
                      </button>
                      <span className="cart-drawer__quantity-value">{product.quantity}</span>
                      <button
                        className="cart-drawer__quantity-btn"
                        onClick={() => dispatch(addBasketItem(product))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <span className="cart-drawer__item-total">
                    ${(getDiscountedPrice(product) * product.quantity).toFixed(2)}
                  </span>

                  <IconButton
                    className="cart-drawer__delete-btn"
                    onClick={() => dispatch(deleteBasketItem(product))}
                    size="small"
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total-row">
                <span className="cart-drawer__total-label">{langSetter("fullprice")}</span>
                <span className="cart-drawer__total-price">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="cart-drawer__confirm-btn">
                {langSetter("confirmcart")}
              </button>
            </div>
          </>
        ) : (
          <div className="cart-drawer__empty">
            <ShoppingBagOutlined className="cart-drawer__empty-icon" sx={{ fontSize: '3rem' }} />
            <p className="cart-drawer__empty-text">{langSetter("empty")}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};
