import React from 'react';

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
    </div>
  );
};
