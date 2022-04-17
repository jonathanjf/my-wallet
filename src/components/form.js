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
      qtd: 0,
    };
  }

  handleInputs({ target }) {
    const { expenses } = this.props;
    const { name, value } = target;
    this.setState({ [name]: value });
    this.setState({ qtd: expenses.length });
  }

  render() {
    const { currencies, priceRequest } = this.props;
    return (
      <form>
        <div className="container">
          <div className="row">
            <label htmlFor="valor">
              Valor
              <input type="number" id="valor" name="value" onChange={ this.handleInputs } />
            </label>
          </div>
          <div className="row description">
            <label htmlFor="desc">
              Descrição
              <input
                type="text"
                id="desc"
                name="description"
                onChange={ this.handleInputs }
              />
            </label>
          </div>
        </div>
        <div className="options">
              <div className="input-field col s12">
                  <select id="moeda" name="currency" onChange={ this.handleInputs }>        
                    {currencies
                      .map((currencie) => <option key={ currencie }>{currencie}</option>)}
                  </select> 
                  <label htmlFor="moeda">Moeda</label>
          </div>
            <div className="input-field col s12">
                <select id="payment-method" name="method" onChange={ this.handleInputs }>
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </select>
                <label htmlFor="payment-method">Método de pagamento</label>
            </div>
            <div className="input-field col s12">
                <select id="tag-payment" name="tag" onChange={ this.handleInputs }>
                  <option>Alimentação</option>
                  <option>Lazer</option>
                  <option>Trabalho</option>
                  <option>Transporte</option>
                  <option>Saúde</option>
                </select>
                <label htmlFor="tag-payment">Tag</label>
            </div>
          
        </div>  
        <button type="button" onClick={ () => priceRequest(this.state) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
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
