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
          textAlign="center"
          color="#1d1d1f"
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Mui-Shop
        </Typography>

        <Box className="footer__aboutme">
          <Typography color="#6e6e73" variant="body2">
            {langSetter("footeraboutme")}
          </Typography>
        </Box>

        <Typography
          className="footer__technologys"
          color="#6e6e73"
          variant="body2"
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
