import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import './Search.scss';

interface SearchProps {
  query: string,
  liftingQuery: (arg: string) => void
  getProducts: (arg: string) => void

}

export const Search: React.FC<SearchProps> = ({ query, liftingQuery, getProducts }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px'
      }}
    >
      <TextField
        fullWidth
        color="secondary"
        className="search"
        id="outlined-basic"
        label="Search"
        variant="standard"
        size="small"
        value={query}
        onChange={(e) => liftingQuery(e.target.value)}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          getProducts(query);
          liftingQuery('')
        }}
      >
        Search
      </Button>
    </Box>
  )
}
