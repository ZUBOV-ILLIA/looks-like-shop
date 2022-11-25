import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { langSetter } from '../../utils/langSetter';
import { SocialLinks } from '../SocialLinks/SocialLinks';

export const Footer: React.FC = () => {
  const { lang } = useSelector((state: RootState) => state.lang);

  return (
    <footer
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        transform: "translateY(100%)"
      }}
    >
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
            {langSetter("footeraboutme")}
          </Typography>

          <SocialLinks />
        </Box>

        <Typography sx={{ width: "30%" }} color="#ff9b07" variant="body1">
          {langSetter("footertechnologys")}
          <strong>
            React, React-Router, Redux Toolkit, Typescript, Material UI, SASS, REST Api {langSetter("footerand")} ESLint
          </strong>.
        </Typography>

        <Box display="none">{lang}</Box>
      </Box>
    </footer>
  );
};
