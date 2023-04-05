import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ fullWidth }: any) {
  return (
      <TextField
        fullWidth
        label="Filled"
        variant="outlined" />
  );
}