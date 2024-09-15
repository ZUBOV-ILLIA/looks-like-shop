import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { langSetter } from "../../utils/langSetter";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import "./Footer.scss";

export const Footer: React.FC = () => {
  const { lang } = useSelector((state: RootState) => state.lang);

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Typography
          className="footer__title"
          // sx={{ width: "30%" }}
          textAlign="center"
          color="#ff9b07"
          variant="h6"
        >
          MUI-SHOP
        </Typography>

        <Box
          className="footer__aboutme"
          // sx={{ width: "30%" }}
        >
          <Typography color="#ff9b07" variant="body1">
            {langSetter("footeraboutme")}
          </Typography>
        </Box>

        <Typography
          className="footer__technologys"
          // sx={{ width: "30%" }}
          color="#ff9b07"
          variant="body1"
        >
          {langSetter("footertechnologys")}
          <strong>
            React, React-Router, Redux Toolkit, Typescript, Material UI, SASS,
            REST Api {langSetter("footerand")} ESLint
          </strong>
          .
        </Typography>
      </div>

      <SocialLinks />

      <Box display="none">{lang}</Box>
    </footer>
  );
};
