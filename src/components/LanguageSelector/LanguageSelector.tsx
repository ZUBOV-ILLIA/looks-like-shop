import { FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../redux/slices/languageSlice';
import { RootState } from '../../redux/store/store';

export const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state: RootState) => state.lang);

  const handleChangeLang = (arg: string) => {
    dispatch(setLang(arg));
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
