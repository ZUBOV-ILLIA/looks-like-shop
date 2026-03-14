import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/pageSlice';
import { RootState } from '../../redux/store/store';
import { langSetter } from '../../utils/langSetter';

interface ItemsPerPageSelectorProps {
  itemsPerPage: number,
  liftingItemsPerPage: (arg: number) => void,
}

export const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPage,
  liftingItemsPerPage,
}) => {
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: '80px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'var(--color-bg-secondary)',
            fontSize: '0.85rem',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'var(--color-border-primary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-accent-blue)',
              borderWidth: '1.5px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.85rem',
            color: 'var(--color-text-tertiary)',
            '&.Mui-focused': {
              color: 'var(--color-accent-blue)',
            },
          },
        }}
      >
        <InputLabel>{langSetter("perpage")}</InputLabel>
        <Select
          value={itemsPerPage}
          label={langSetter("perpage")}
          onChange={(e) => {
            liftingItemsPerPage(+e.target.value);
            dispatch(setPage(1));
          }}
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
      <Typography sx={{ display: "none" }}>{lang}</Typography>
    </>
  );
};
