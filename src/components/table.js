import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);

    this.createRate = this.createRate.bind(this);
  }

  createRate() {
    const { expenses } = this.props;
    expenses.map((expense) => {
      const rateChanged = (expense.exchangeRates[expense.currency].ask)
        .toFixed(2);
      return <td key={ expense.id }>{rateChanged}</td>;
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? <tr><td>Sem gastos até o momento</td></tr> : expenses
            .map((expense) => (
              <tr key={ expense.id }>
                <td key={ expense.description }>{expense.description}</td>
                <td key={ expense.tag }>{expense.tag}</td>
                <td key={ expense.method }>{expense.method}</td>
                <td key={ expense.value }>{expense.value}</td>
                <td key={ expense.exchangeRates[expense.currency].name }>
                  {expense.exchangeRates[expense.currency].name
                    .split('/')[0]}

                </td>
                {
                  this.createRate
                }
                <td key={ expense.id }>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}

                </td>
                <td key={ expense.id }>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object),
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, null)(Table);
