import React from 'react';
import { json, checkStatus } from './utils';
import DropdownMenu from './DropdownMenu';
import './CurrencyConverter.css';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: '',
      chosenCurrency: 'USD',
      convertTo: 'EUR',
      amountToConvert: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  convertCurrencyTo = (currency) => {
    this.setState({ convertTo: currency});
  }

  chooseCurrency = (currency) => {
    this.setState({ chosenCurrency: currency});
  }

  handleChange(event){
    // let {amountToConvert} = this.state;
    // if(amountToConvert === ''){
    //   return;
    // } else {
    this.setState({ amountToConvert: event.target.value });
    // }
  }

  handleSubmit(event) {
    event.preventDefault();
    let { chosenCurrency } = this.state;;
    fetch(`https://api.frankfurter.app/latest?from=${chosenCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (!data) {
          throw new Error(data.Error);
        }
        if (data) {
          console.log(data.rates);
          this.setState({ results: data.rates, error: ''});
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  render() {
    const { results, error, chosenCurrency, convertTo, amountToConvert } = this.state;
    return (
      <div className="container">
        <form className="form-inline my-4" onSubmit={this.handleSubmit}>
          <div className="row">
            <h2>Exchange Rate Converter</h2>
            <div className="col-12 col-md-6">
                <h4>From</h4>
                <DropdownMenu value={chosenCurrency} passCurrency={this.chooseCurrency} />
                <input type="number" className="form-control" id="custom-form1" onChange={this.handleChange} />
            </div>
            <div className="col-12 col-md-6">
                <h4>To</h4>
                <DropdownMenu value={convertTo} passCurrency={this.convertCurrencyTo} />
                <div className="px-2 pt-3 output" id="custom-form2">
                {(() => {
                  if (error) {
                    return error;
                  } if(chosenCurrency === convertTo){
                    return <p>{amountToConvert}</p>
                  } else {
                    return <p>{(amountToConvert * results[convertTo]).toFixed(4)}</p>;
                  }
                })()}  
                </div> 
            </div>
          </div>
          <div className="row my-4 row-adjust">
            <button type="submit" className="btn btn-secondary btn-custom">Convert</button>
          </div>
        </form>
      </div>
    );
  };
}

export default CurrencyConverter;