import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/pageSlice';
import { RootState } from '../../redux/store/store';
import { langSetter } from '../../utils/langSetter';
import './Search.scss';

interface SearchProps {
  query: string,
  liftingQuery: (arg: string) => void
  getProducts: (arg: string) => void
}

export const Search: React.FC<SearchProps> = ({ query, liftingQuery, getProducts }) => {
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

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
        label={langSetter("search")}
        variant="standard"
        size="small"
        value={query}
        onChange={(e) => liftingQuery(e.target.value)}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          if (query.trim()) {
            getProducts(query);
            dispatch(setPage(1));
            // liftingPage();
            liftingQuery('');
          }
        }}
      >
        {langSetter("search")}
      </Button>

      <Box display="none">{lang}</Box>
    </Box>
  );
};
