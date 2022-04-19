import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Header from './components/header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import './app.css';

function App() {

  const CustomizedTheme = createTheme({
    palette: {
      primary: {
        main:"#008080"
      },
      secondary: {
        main: "#66b2b2"
      },
    }
  })

  return (
    <Grid  container style={{ minWidth: "100vh", minHeight: "100vh", backgroundColor: "#F5F5F5"}} flexDirection="column">
      <ThemeProvider theme={CustomizedTheme}>
        <Header />
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </ThemeProvider>
    </Grid>
  );
}

export default App;
