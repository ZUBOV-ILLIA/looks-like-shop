import { TextField } from '@mui/material';
import React from 'react';
import './Search.scss';

export const Search: React.FC = () => {
  return (
    <TextField
      fullWidth
      color="secondary"
      className="search"
      id="outlined-basic"
      label="Search"
      variant="standard"
      size="small"
    />
  )
}
