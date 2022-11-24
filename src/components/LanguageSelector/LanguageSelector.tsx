import { FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

export const LanguageSelector = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || 'en');

  const handleChangeLang = (arg: string) => {
    setLang(arg);
    localStorage.setItem("lang", arg);
  };

  return (
    <div className="container">
      <Box sx={{ m: "10px 0", display: "flex", justifyContent: "right" }}>
        <FormControl>
          <Select
            size="small"
            value={lang}
            onChange={(e) => handleChangeLang(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ua">UA</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
