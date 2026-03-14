import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { langSetter } from '../../utils/langSetter';

export const PageNotFound: React.FC = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        padding: '80px 20px',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '500px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#1d1d1f',
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        {langSetter("oops")}
      </h1>

      <p
        style={{
          color: '#6e6e73',
          fontSize: '1rem',
          marginBottom: '32px',
        }}
      >
        404
      </p>

      <img
        src="images/404/error-404.png"
        alt={langSetter("oops")}
        style={{ width: '60%', maxWidth: '300px', marginBottom: '40px' }}
      />

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            textTransform: 'none',
            backgroundColor: '#1d1d1f',
            color: '#fff',
            borderRadius: '980px',
            padding: '10px 32px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          {langSetter("backtohome")}
        </Button>
      </Link>
    </div>
  );
};
