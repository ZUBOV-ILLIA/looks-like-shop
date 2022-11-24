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
        sx={{
          width: '210px'
        }}
      >
        <InputLabel>{langSetter("sortby")}</InputLabel>
        <Select
          value={sortBy}
          defaultValue={'by rating'}
          label={langSetter("sortby")}
          onChange={(e) => liftingSortBy(e.target.value)}
          color="secondary"

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
