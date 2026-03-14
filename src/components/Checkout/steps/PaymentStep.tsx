import React, { useState } from 'react';
import { PaymentData } from '../Checkout';
import { langSetter } from '../../../utils/langSetter';

interface PaymentStepProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  onNext: () => void;
  onBack: () => void;
}

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

export const PaymentStep: React.FC<PaymentStepProps> = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentData, string>>>({});

  const handleChange = (field: keyof PaymentData, value: string) => {
    let formatted = value;
    if (field === 'cardNumber') formatted = formatCardNumber(value);
    if (field === 'expiryDate') formatted = formatExpiryDate(value);
    if (field === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 4);

    onChange({ ...data, [field]: formatted });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentData, string>> = {};
    const cardDigits = data.cardNumber.replace(/\s/g, '');

    if (cardDigits.length < 13) newErrors.cardNumber = langSetter('checkoutInvalidCard') || '';
    if (!/^\d{2}\/\d{2}$/.test(data.expiryDate)) newErrors.expiryDate = langSetter('checkoutInvalidExpiry') || '';
    if (data.cvv.length < 3) newErrors.cvv = langSetter('checkoutInvalidCvv') || '';
    if (!data.cardholderName.trim()) newErrors.cardholderName = langSetter('checkoutRequired') || '';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form className="checkout__step" onSubmit={handleSubmit} data-testid="payment-step">
      <h2 className="checkout__step-title">{langSetter('checkoutPayment')}</h2>

      <div className="checkout__field">
        <label className="checkout__label" htmlFor="card-number">
          {langSetter('checkoutCardNumber')}
        </label>
        <input
          id="card-number"
          className={`checkout__input ${errors.cardNumber ? 'checkout__input--error' : ''}`}
          type="text"
          value={data.cardNumber}
          onChange={e => handleChange('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <span className="checkout__error">{errors.cardNumber}</span>}
      </div>

      <div className="checkout__field-row">
        <div className="checkout__field">
          <label className="checkout__label" htmlFor="expiry-date">
            {langSetter('checkoutExpiry')}
          </label>
          <input
            id="expiry-date"
            className={`checkout__input ${errors.expiryDate ? 'checkout__input--error' : ''}`}
            type="text"
            value={data.expiryDate}
            onChange={e => handleChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <span className="checkout__error">{errors.expiryDate}</span>}
        </div>

        <div className="checkout__field">
          <label className="checkout__label" htmlFor="cvv">
            {langSetter('checkoutCvv')}
          </label>
          <input
            id="cvv"
            className={`checkout__input ${errors.cvv ? 'checkout__input--error' : ''}`}
            type="text"
            value={data.cvv}
            onChange={e => handleChange('cvv', e.target.value)}
            placeholder="123"
          />
          {errors.cvv && <span className="checkout__error">{errors.cvv}</span>}
        </div>
      </div>

      <div className="checkout__field">
        <label className="checkout__label" htmlFor="cardholder-name">
          {langSetter('checkoutCardholderName')}
        </label>
        <input
          id="cardholder-name"
          className={`checkout__input ${errors.cardholderName ? 'checkout__input--error' : ''}`}
          type="text"
          value={data.cardholderName}
          onChange={e => handleChange('cardholderName', e.target.value)}
        />
        {errors.cardholderName && <span className="checkout__error">{errors.cardholderName}</span>}
      </div>

      <div className="checkout__actions">
        <button type="button" className="checkout__back-btn" onClick={onBack}>
          {langSetter('checkoutBack')}
        </button>
        <button type="submit" className="checkout__next-btn">
          {langSetter('checkoutNext')}
        </button>
      </div>
    </form>
  );
};
