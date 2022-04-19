import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeItem}  from '../actions/index';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
    }
  }

  componentDidUpdate() {
    const { rate } = this.state;
    console.log(rate)
  }

  render() {
    const { expenses, removeClick, ...props } = this.props;
      return (
        <TableContainer component={Paper} style={{ minHeight: "100vh", minWidth: "100vw"}}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Método de pagamento</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Cambio utilizado</TableCell>
                  <TableCell>Valor convertido</TableCell>
                  <TableCell>Moeda</TableCell>
                  <TableCell>Moeda de conversão</TableCell>
                  <TableCell>Editar/Excluir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length === 0 ? <TableRow><TableCell>Sem gastos até o momento</TableCell></TableRow> : expenses
                  .map((expense) => (
                    <TableRow key={ expense.id }>
                      <TableCell >{expense.description}</TableCell>
                      <TableCell >{expense.tag}</TableCell>
                      <TableCell >{expense.method}</TableCell>
                      <TableCell >{expense.value}</TableCell>
                      <TableCell>{ expense.exchangeRates[expense.currency].ask }</TableCell>
                      <TableCell key={ expense.id }>
                        {(expense.value * expense.exchangeRates[expense.currency].ask)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell >
                        {expense.exchangeRates[expense.currency].name
                          .split('/')[0]}
                      </TableCell>
                      <TableCell >Real</TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small">Editar</Button>
                        <Button variant="outlined" size="small" onClick={ () => removeClick(expense.id) }>Excluir</Button>
                      </TableCell>
                    </TableRow>))}
              </TableBody>
            </Table>
            </TableContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});


const mapDispatchToProps = (dispatch) => ({
  removeClick: (state) => dispatch(removeItem(state)),
});

TableComponent.propTypes = {
  expenses: PropTypes.arrayOf(Object),
};

TableComponent.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
