import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/form';
import { currenciesRequestThunk } from '../actions/index';
import { createTheme, ThemeProvider } from '@mui/material';
import Table from '../components/table';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

class Wallet extends React.Component {
  constructor() {
    super();

    this.reduceValues = this.reduceValues.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  reduceValues() {
    const { expenses } = this.props;
    let totalValue = 0;
    expenses
      .forEach((expense) => {
        totalValue += Number(expense.value)
        * Number(expense.exchangeRates[expense.currency].ask);
      });
    const valueFixed = totalValue.toFixed(2);
    return valueFixed;
  }

  render() {

    const CustomizedTheme = createTheme({
      palette: {
        primary: {
          main:"#66b2b2"
        },
      }
    });
    
    const { email, expenses } = this.props;
    return (
      <ThemeProvider theme={CustomizedTheme} >
        <Grid container style={{ minHeight: "100vh", minWidth: "100vw"}}>
          <Box color="primary" sx={{ flexGrow: 1, minWidth: "100vw" }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" fontWeight="bolder" color="#fff" component="div" sx={{ flexGrow: 1 }}>
                Seja bem-vindo, {email.toUpperCase()}
              </Typography>
            </Toolbar>
          </AppBar>
          </Box>
          <main>
            <Form />
            <Table />
          </main>
          {expenses.length === 0 ? <p data-testid="total-field">0</p>
              : <p data-testid="total-field">{this.reduceValues()}</p>}
            <p data-testid="header-currency-field">BRL</p>
        </Grid>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(currenciesRequestThunk()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
  requestCurrencies: PropTypes.func,
  expenses: PropTypes.arrayOf(Object),
};

Wallet.defaultProps = {
  expenses: [],
};
