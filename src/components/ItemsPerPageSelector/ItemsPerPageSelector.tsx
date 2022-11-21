import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const ItemsPerPageSelector: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(16);

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
          defaultValue={12}
          label="Per Page"
          onChange={(e) => setItemsPerPage(+e.target.value)}
          color="secondary"

          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
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
}
