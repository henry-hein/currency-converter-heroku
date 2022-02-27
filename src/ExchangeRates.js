import React from 'react';
import { json, checkStatus } from './utils';


class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`https://api.frankfurter.app/latest?from=USD`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (!data) {
          throw new Error(data.Error);
        }
        if (data) {
          console.log(data);
          //console.log(data.rates);
          this.setState({ results: data.rates, error: ''});
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  render() {
    const { results, error } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="table-responsive-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Rate</th>
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