import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/pageSlice";
import { RootState } from "../../redux/store/store";
import { langSetter } from "../../utils/langSetter";
import "./Search.scss";

interface SearchProps {
  query: string;
  liftingQuery: (arg: string) => void;
  getProducts: (arg: string) => void;
}

export const Search: React.FC<SearchProps> = ({
  query,
  liftingQuery,
  getProducts,
}) => {
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      getProducts(query);
      dispatch(setPage(1));
      liftingQuery("");
    }
  };

  return (
    <Box className="search-bar">
      <SearchIcon className="search-icon" />
      <TextField
        fullWidth
        className="search-input"
        placeholder={langSetter("search")}
        variant="standard"
        size="small"
        value={query}
        onChange={(e) => liftingQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <Button
        className="search-btn"
        variant="contained"
        disableElevation
        onClick={handleSearch}
      >
        {langSetter("search")}
      </Button>
      <Box display="none">{lang}</Box>
    </Box>
  );
};
