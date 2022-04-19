import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
/* import { createTheme, ThemeProvider } from '@mui/material/styles'; */
import "./header.css";


const Header = () => {
  return (
      <Box color="primary" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              My Wallet
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
  )
}

export default Header;