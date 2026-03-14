import React, { useState } from 'react';
import { AddressData } from '../Checkout';
import { langSetter } from '../../../utils/langSetter';

interface AddressStepProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  onNext: () => void;
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\+?[\d\s()-]{7,}$/.test(phone);

export const AddressStep: React.FC<AddressStepProps> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});

  const handleChange = (field: keyof AddressData, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};

    if (!data.name.trim()) newErrors.name = langSetter('checkoutRequired') || '';
    if (!data.email.trim()) newErrors.email = langSetter('checkoutRequired') || '';
    else if (!validateEmail(data.email)) newErrors.email = langSetter('checkoutInvalidEmail') || '';
    if (!data.phone.trim()) newErrors.phone = langSetter('checkoutRequired') || '';
    else if (!validatePhone(data.phone)) newErrors.phone = langSetter('checkoutInvalidPhone') || '';
    if (!data.address.trim()) newErrors.address = langSetter('checkoutRequired') || '';
    if (!data.city.trim()) newErrors.city = langSetter('checkoutRequired') || '';
    if (!data.zip.trim()) newErrors.zip = langSetter('checkoutRequired') || '';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const fields: { key: keyof AddressData; type: string }[] = [
    { key: 'name', type: 'text' },
    { key: 'email', type: 'email' },
    { key: 'phone', type: 'tel' },
    { key: 'address', type: 'text' },
    { key: 'city', type: 'text' },
    { key: 'zip', type: 'text' },
  ];

  const labelKeys: Record<keyof AddressData, string> = {
    name: 'checkoutName',
    email: 'checkoutEmail',
    phone: 'checkoutPhone',
    address: 'checkoutAddressField',
    city: 'checkoutCity',
    zip: 'checkoutZip',
  };

  return (
    <form className="checkout__step" onSubmit={handleSubmit} data-testid="address-step">
      <h2 className="checkout__step-title">{langSetter('checkoutAddress')}</h2>
      {fields.map(({ key, type }) => (
        <div className="checkout__field" key={key}>
          <label className="checkout__label" htmlFor={`address-${key}`}>
            {langSetter(labelKeys[key])}
          </label>
          <input
            id={`address-${key}`}
            className={`checkout__input ${errors[key] ? 'checkout__input--error' : ''}`}
            type={type}
            value={data[key]}
            onChange={e => handleChange(key, e.target.value)}
          />
          {errors[key] && <span className="checkout__error">{errors[key]}</span>}
        </div>
      ))}
      <div className="checkout__actions">
        <button type="submit" className="checkout__next-btn">
          {langSetter('checkoutNext')}
        </button>
      </div>
    </form>
  );
};
