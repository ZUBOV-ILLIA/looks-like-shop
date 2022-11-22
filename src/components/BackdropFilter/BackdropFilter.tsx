import React from 'react';
import './BackdropFilter.scss';

interface BackdropFilterProps {
  liftState: (arg: boolean) => void,
}

export const BackdropFilter: React.FC<BackdropFilterProps> = ({ liftState }) => {
  return (
    <div className="backdrop-filter" onClick={() => liftState(false)}></div>
  );
};
