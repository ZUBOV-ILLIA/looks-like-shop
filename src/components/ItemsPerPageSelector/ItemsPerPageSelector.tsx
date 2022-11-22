import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface ItemsPerPageSelectorProps {
  itemsPerPage: number,
  liftingItemsPerPage: (arg: number) => void,
  liftingPage: () => void,
}

export const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ itemsPerPage, liftingItemsPerPage, liftingPage }) => {

  return (
    <>
      <FormControl
        sx={{
          width: '80px'
        }}
      >
        <InputLabel>Per Page</InputLabel>
        <Select
          value={itemsPerPage}
          label="Per Page"
          onChange={(e) => {
            liftingItemsPerPage(+e.target.value)
            liftingPage();
          }}
          color="secondary"

          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={28}>28</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
      </FormControl>
    </>
  )
};
