import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SortByProps {
  sortBy: string,
  liftingSortBy: (arg: string) => void,
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, liftingSortBy}) => {

  return (
    <>
      <FormControl
        sx={{
          width: '210px'
        }}
      >
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          defaultValue={'by rating'}
          label="Sort By"
          onChange={(e) => liftingSortBy(e.target.value)}
          color="secondary"

          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="by rating">by rating</MenuItem>
          <MenuItem value="lowest to highest price">lowest to highest price</MenuItem>
          <MenuItem value="highest to lowest price">highest to lowest price</MenuItem>
          <MenuItem value="alphabet">alphabet</MenuItem>
          <MenuItem value="alphabet backwards">alphabet backwards</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
