import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound: React.FC = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >

      <h1 style={{ textAlign: 'center' }}>Oops Page Not Found!</h1>

      <img src="../images/404/error-404.png" alt="Oops Page Not Found!" style={{ width: '50%' }} />

      <Link
        className="header__nav-item"
        to="/"
        style={{
          color: '#000',
          fontWeight: 700,
        }}

      >
        <Button variant="outlined">
          {'Back to Home'.toUpperCase()}
        </Button>
      </Link>
    </div>
  );
};
