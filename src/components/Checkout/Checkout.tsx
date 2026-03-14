import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AddressStep } from './steps/AddressStep';
import { PaymentStep } from './steps/PaymentStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { langSetter } from '../../utils/langSetter';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';

export interface AddressData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const STEP_KEYS = ['checkoutAddress', 'checkoutPayment', 'checkoutConfirmation'] as const;

export const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addressData, setAddressData] = useState<AddressData>({
    name: '', email: '', phone: '', address: '', city: '', zip: '',
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '', expiryDate: '', cvv: '', cardholderName: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const basket = useSelector((state: RootState) => state.basket.basket);
  const navigate = useNavigate();

  if (basket.length === 0 && !orderPlaced) {
    return (
      <>
        <Header />
        <div className="checkout">
          <div className="checkout__empty">
            <p>{langSetter('checkoutEmptyCart')}</p>
            <button className="checkout__back-btn" onClick={() => navigate('/')}>
              {langSetter('backtohome')}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout__container">
          {!orderPlaced && (
            <div className="checkout__progress">
              {STEP_KEYS.map((key, index) => (
                <div
                  key={key}
                  className={`checkout__progress-step ${
                    index <= currentStep ? 'checkout__progress-step--active' : ''
                  } ${index < currentStep ? 'checkout__progress-step--completed' : ''}`}
                >
                  <div className="checkout__progress-number" data-testid="progress-number">{index + 1}</div>
                  <span className="checkout__progress-label">{langSetter(key)}</span>
                </div>
              ))}
              <div className="checkout__progress-line">
                <div
                  className="checkout__progress-fill"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                />
              </div>
            </div>
          )}

          {orderPlaced ? (
            <div className="checkout__success">
              <div className="checkout__success-icon">&#10003;</div>
              <h2>{langSetter('checkoutOrderPlaced')}</h2>
              <p>{langSetter('checkoutThankYou')}</p>
              <button className="checkout__back-btn" onClick={() => navigate('/')}>
                {langSetter('backtohome')}
              </button>
            </div>
          ) : (
            <>
              {currentStep === 0 && (
                <AddressStep
                  data={addressData}
                  onChange={setAddressData}
                  onNext={handleNextStep}
                />
              )}
              {currentStep === 1 && (
                <PaymentStep
                  data={paymentData}
                  onChange={setPaymentData}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                />
              )}
              {currentStep === 2 && (
                <ConfirmationStep
                  addressData={addressData}
                  paymentData={paymentData}
                  onBack={handlePrevStep}
                  onPlaceOrder={handlePlaceOrder}
                />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
