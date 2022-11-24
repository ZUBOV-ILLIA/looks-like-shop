import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { langSetter } from '../../utils/langSetter';

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

      <h1 style={{ textAlign: 'center' }}>{langSetter("oops")}</h1>

      <img src="../images/404/error-404.png" alt={langSetter("oops")} style={{ width: '50%' }} />

      <Link
        className="header__nav-item"
        to="/"
        style={{
          color: '#000',
          fontWeight: 700,
        }}

      >
        <Button variant="outlined" sx={{ textTransform: "uppercase" }}>
          {langSetter("backtohome")}
        </Button>
      </Link>
    </div>
  );
};
