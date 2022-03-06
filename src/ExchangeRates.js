import React, {set} from 'react';
import DropdownMenu from './DropdownMenu';
import { json, checkStatus } from './utils';


class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: '',
      chosenCurrency: 'USD',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  chooseCurrency = (currency) => {
    this.setState({ chosenCurrency: currency});
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
    const { results, error, chosenCurrency } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <h2>{chosenCurrency} Exchange Rate Table</h2>
              <DropdownMenu passCurrency={this.chooseCurrency} />
              <button type="submit" className="btn btn-secondary" style={{ width: "100px" }}>Submit</button>
            </form>
            <div className="table-responsive-sm">
              <table className="table" style={{fontSize: "16px"}}>
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Inv. Rate</th>
                  </tr>
                </thead>
                <tbody>
            {(() => {
              if (error) {
                return error;
              }
              return Object.keys(results).map((key) => {
                return (
                      <tr>
                        <td>{key}</td>
                        <td>{results[key]}</td>
                        <td>{(1/results[key]).toFixed(4)}</td>
                      </tr>
                );
              })
            })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExchangeRates;