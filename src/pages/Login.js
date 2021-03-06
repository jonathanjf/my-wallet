import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../actions/index';
import "./login.css";

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputsAndVerify = this.handleInputsAndVerify.bind(this);
    this.loginSucess = this.loginSucess.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleInputsAndVerify({ target }) {
    const { name, value } = target;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const passCounter = 6;
    this.setState({ [name]: value });
    if (regex.test(email) === true && password.length >= passCounter - 1) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  loginSucess() {
    window.location.href = 'carteira';
  }

  render() {
    const { disabled, email } = this.state;
    const { loginClick } = this.props;
    return (
      <div className="container ">
        <form className="col s12 display-container">
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                data-testid="email-input"
                onChange={ this.handleInputsAndVerify }
                name="email"
                id="email"
              />
              <label htmlFor="email" className="active">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                data-testid="password-input"
                name="password"
                id='password'
                onChange={ this.handleInputsAndVerify }
              />
              <label htmlFor="password" className="active">Password</label>
            </div>
          </div>
          {
            disabled ? <button
            className="waves-effect waves-light  btn-large teal"
            type="button"
            disabled={ disabled }
          >
            Entrar
          </button> : <Link to="/carteira"> 
            <button
              className="waves-effect waves-light  btn-large teal"
              type="button"
              disabled={ disabled }
              onClick={  () => loginClick(email) }
            >
              Entrar
            </button>
            </Link>
          }
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginClick: (email) => dispatch(loginAction({ email })),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginClick: PropTypes.func.isRequired,
};

