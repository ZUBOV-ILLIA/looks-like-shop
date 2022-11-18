import { TextField } from '@mui/material';
import React from 'react';
import './Search.scss';

export const Search: React.FC = () => {
  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
    />
  )
}
