import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe, FaCopyright } from 'react-icons/fa';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav className="container navbar navbar-expand-lg navbar-dark">
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
      
      <footer className="text-center text-lg-start container">
        <p><FaTwitter /> <a target="_blank" href="https://twitter.com">Twitter</a></p>
        <p><FaLinkedin /> <a target="_blank" href="https://linkedin.com/in/henry-hein">Linkedin Account</a></p>
        <p><FaGithub /> <a target="_blank" href="https://www.github.com/henry-hein">Github</a></p>
        <p><FaGlobe /> <a target="_blank" href="https://henryhein.netlify.app">Personal Portfolio</a></p>
        <div className="mx-auto"><FaCopyright /> All rights reserved to Currency Converter Inc.</div>
      </footer>
    </Router>
  );
}



export default App;
