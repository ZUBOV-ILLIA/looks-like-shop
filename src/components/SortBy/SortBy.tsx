import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const SortBy: React.FC = () => {
  const [sortBy, setSortBy] = useState("by rating");

  return (
    <>
      <FormControl
        sx={{
          width: '210px'
        }}
      >
        <InputLabel>Show</InputLabel>
        <Select
          value={sortBy}
          defaultValue={'by rating'}
          label="Show"
          onChange={(e) => setSortBy(e.target.value)}
          color="secondary"

          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="by rating">by rating</MenuItem>
          <MenuItem value="lowest to highest price">lowest to highest price</MenuItem>
          <MenuItem value="highest to lowest price">highest to lowest price</MenuItem>
          <MenuItem value="by reviews">by reviews</MenuItem>
          <MenuItem value="by date of addition">by date of addition</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
