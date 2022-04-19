import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction} from '../actions/index';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
        <Grid 
          container 
          justifyContent="center"  
          alignItems="center" 
          flexDirection="column" 
          style={{ minHeight: '80vh', maxWidth: '50vw' }}
          alignSelf="center"
          gap="1em"
        >
          <Box 
            display="flex" 
            gap="2em" 
            flexDirection="column"
            style={{ backgroundColor: "#fff", padding: "2em", borderRadius: "8px", boxShadow: "5px 10px 18px #888888"}}
          >
              <TextField
                type="text"
                placeholder="Digite seu email"
                data-testid="email-input"
                onChange={ this.handleInputsAndVerify }
                name="email"
                id="email"
                color="primary"
                
              />
              <TextField
                className="validate"
                type="password"
                placeholder="Digite sua senha"
                data-testid="password-input"
                name="password"
                id='password'
                color="primary"
                onChange={ this.handleInputsAndVerify }
              />
          {
            disabled ? <Button
            type="button"
            variant="contained"
            disabled={ disabled }
            size="large"
          >
            Entrar
          </Button> :
            <Button
              variant="contained"
              type="button"
              size="large"
              component={ Link }
              to="/carteira"
              onClick={  () => loginClick(email) }
            >
              Entrar
            </Button>
          }
          </Box>
        </Grid>
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

