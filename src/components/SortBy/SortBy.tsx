import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { langSetter } from '../../utils/langSetter';

interface SortByProps {
  sortBy: string,
  liftingSortBy: (arg: string) => void,
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, liftingSortBy}) => {
  const { lang } = useSelector((state: RootState) => state.lang);

  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: '180px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f5f5f7',
            fontSize: '0.85rem',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: '#d2d2d7',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0071e3',
              borderWidth: '1.5px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.85rem',
            color: '#86868b',
            '&.Mui-focused': {
              color: '#0071e3',
            },
          },
        }}
      >
        <InputLabel>{langSetter("sortby")}</InputLabel>
        <Select
          value={sortBy}
          label={langSetter("sortby")}
          onChange={(e) => liftingSortBy(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="by rating">{langSetter("byrating")}</MenuItem>
          <MenuItem value="lowest to highest price">{langSetter("lowtohigh")}</MenuItem>
          <MenuItem value="highest to lowest price">{langSetter("hightolow")}</MenuItem>
          <MenuItem value="alphabet">{langSetter("alph")}</MenuItem>
          <MenuItem value="alphabet backwards">{langSetter("alphback")}</MenuItem>
        </Select>
      </FormControl>

      <Box display="none">{lang}</Box>
    </>
  );
};
