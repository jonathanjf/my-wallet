import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Header from './components/header';
import './app.css';

function App() {
  return (
    <div className="container-app">
      <Header />
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </div>
  );
}

export default App;
