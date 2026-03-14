import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { AddressData, PaymentData } from '../Checkout';
import { langSetter } from '../../../utils/langSetter';
import { Product } from '../../../types/products';

interface ConfirmationStepProps {
  addressData: AddressData;
  paymentData: PaymentData;
  onBack: () => void;
  onPlaceOrder: () => void;
}

const getDiscountedPrice = (product: Product) => {
  if (product.discountPercentage > 0) {
    return product.price * (1 - product.discountPercentage / 100);
  }
  return product.price;
};

const maskCardNumber = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\s/g, '');
  return `**** **** **** ${digits.slice(-4)}`;
};

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  addressData,
  paymentData,
  onBack,
  onPlaceOrder,
}) => {
  const basket = useSelector((state: RootState) => state.basket.basket);

  const totalPrice = basket.reduce(
    (prev, el) => prev + getDiscountedPrice(el) * el.quantity,
    0
  );

  return (
    <div className="checkout__step" data-testid="confirmation-step">
      <h2 className="checkout__step-title">{langSetter('checkoutConfirmation')}</h2>

      <div className="checkout__summary-section">
        <h3 className="checkout__summary-heading">{langSetter('checkoutOrderSummary')}</h3>
        <div className="checkout__summary-items">
          {basket.map(item => (
            <div className="checkout__summary-item" key={item.id}>
              <img
                className="checkout__summary-item-image"
                src={item.thumbnail}
                alt={item.title}
              />
              <div className="checkout__summary-item-details">
                <span className="checkout__summary-item-title">{item.title}</span>
                <span className="checkout__summary-item-qty">x{item.quantity}</span>
              </div>
              <span className="checkout__summary-item-price">
                ${(getDiscountedPrice(item) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="checkout__summary-total">
          <span>{langSetter('fullprice')}</span>
          <span className="checkout__summary-total-price">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout__summary-section">
        <h3 className="checkout__summary-heading">{langSetter('checkoutShippingAddress')}</h3>
        <p className="checkout__summary-text">{addressData.name}</p>
        <p className="checkout__summary-text">{addressData.address}</p>
        <p className="checkout__summary-text">{addressData.city}, {addressData.zip}</p>
        <p className="checkout__summary-text">{addressData.email}</p>
        <p className="checkout__summary-text">{addressData.phone}</p>
      </div>

      <div className="checkout__summary-section">
        <h3 className="checkout__summary-heading">{langSetter('checkoutPaymentMethod')}</h3>
        <p className="checkout__summary-text">{maskCardNumber(paymentData.cardNumber)}</p>
        <p className="checkout__summary-text">{paymentData.cardholderName}</p>
      </div>

      <div className="checkout__actions">
        <button type="button" className="checkout__back-btn" onClick={onBack}>
          {langSetter('checkoutBack')}
        </button>
        <button type="button" className="checkout__place-order-btn" onClick={onPlaceOrder}>
          {langSetter('checkoutPlaceOrder')}
        </button>
      </div>
    </div>
  );
};
