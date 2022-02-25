import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe, FaCopyright } from 'react-icons/fa';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Currency Converter</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Convert </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Rates</a>
            </li>
          </ul>
        </div>
      </nav>
      
      <Route path="/" exact component={ CurrencyConverter } />
      <Route path="/" component={ ExchangeRates } />
      <Route component={NotFound} />
      
      <footer className="text-center text-lg-start bg-dark">
        <p><FaTwitter /> <a target="_blank" href="https://twitter.com">www.twitter.com</a></p>
        <p><FaLinkedin /> <a target="_blank" href="https://linkedin.com">www.linkedin.com</a></p>
        <p><FaGithub /> <a target="_blank" href="https://www.github.com/henry-hein">www.github.com/henry-hein</a></p>
        <p><FaGlobe /> <a target="_blank" href="https://www.google.com">www.currencyconverter.com</a></p>
        <div className="mx-auto"><FaCopyright /> All rights reserved to Currency Converter Inc.</div>
      </footer>
    </Router>
  );
}



export default App;
