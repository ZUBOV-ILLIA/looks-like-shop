import { GitHub, LinkedIn, Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

const links = [
  {
    socLink: "https://telegram.me/ZubovIllia",
    icon: <Telegram fontSize="large" />,
  },
  {
    socLink: "https://www.linkedin.com/in/illia-zubov/",
    icon: <LinkedIn fontSize="large" />,
  },
  {
    socLink: "https://github.com/ZUBOV-ILLIA?tab=repositories",
    icon: <GitHub fontSize="large" />,
  },
];

export const SocialLinks: React.FC = () => {
  return (
    <Box
      className="social-links"
      sx={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {links.map((link) => (
        <a
          key={link.socLink}
          href={link.socLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
        >
          {link.icon}
        </a>
      ))}
    </Box>
  );
};
