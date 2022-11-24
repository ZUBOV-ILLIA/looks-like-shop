import { Box, Typography } from '@mui/material';
import React from 'react';
import { SocialLinks } from '../SocialLinks/SocialLinks';

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: "100px 50px 80px",
        minWidth: "778px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Typography
        sx={{ width: "30%" }}
        textAlign="center"
        color="#ff9b07"
        variant="h6">
        MUI-SHOP
      </Typography>

      <Box sx={{ width: "30%" }}>
        <Typography color="#ff9b07" variant="body1" mb="15px">
          {`Hello, my name is Ilya, I'm a Frontend developer.
          This is one of the works in my portfolio.
          You can contact me using these links: `}
        </Typography>

        <SocialLinks />
      </Box>

      <Typography sx={{ width: "30%" }} color="#ff9b07" variant="body1">
        {`This website is made using such technologies and means: `}
        <strong>React, React-Router, Redux Toolkit, Typescript, Material UI, SASS, REST Api and ESLint</strong>.
      </Typography>
    </Box>
  );
};
