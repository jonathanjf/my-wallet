import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestApiPriceThunk } from '../actions';
import "./form.css";

class Form extends Component {
  constructor() {
    super();
    this.handleInputs = this.handleInputs.bind(this);
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    };
  }

  handleInputs({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies, priceRequest } = this.props;
    return (
      <form>
            <label htmlFor="valor">
              Valor
              <input type="number" id="valor" name="value" onChange={ this.handleInputs } />
            </label>
            <label htmlFor="desc">
              Descrição
              <input
                type="text"
                id="desc"
                name="description"
                onChange={ this.handleInputs }
              />
            </label>
                  <select id="moeda" name="currency" onChange={ this.handleInputs }>        
                    {currencies
                      .map((currencie) => <option key={ currencie }>{currencie}</option>)}
                  </select> 
                  <label htmlFor="moeda">Moeda</label>
                <select id="payment-method" name="method" onChange={ this.handleInputs }>
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </select>
                <label htmlFor="payment-method">Método de pagamento</label>
                <select id="tag-payment" name="tag" onChange={ this.handleInputs }>
                  <option>Alimentação</option>
                  <option>Lazer</option>
                  <option>Trabalho</option>
                  <option>Transporte</option>
                  <option>Saúde</option>
                </select>
                <label htmlFor="tag-payment">Tag</label> 
        <button type="button" onClick={ () => {
          priceRequest(this.state) 
          }
        }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: [state.wallet.expenses],
});

const mapDispatchToProps = (dispatch) => ({
  priceRequest: (state) => dispatch(requestApiPriceThunk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(String),
  expenses: PropTypes.arrayOf(Object),
  priceRequest: PropTypes.func.isRequired,
};

Form.defaultProps = {
  currencies: [],
  expenses: [],
};
