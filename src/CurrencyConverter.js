import React from 'react';
import { json, checkStatus } from './utils';
import DropdownMenu from './DropdownMenu';
import './CurrencyConverter.css';
import { FaArrowsAltH } from 'react-icons/fa';
import Chart from 'chart.js/auto';


class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: '',
      chosenCurrency: 'USD',
      convertTo: 'EUR',
      amountToConvert: 1,
    };

    this.chartRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.getHistoricalRates = this.getHistoricalRates.bind(this);
  }

  componentDidMount() {
    const { chosenCurrency, convertTo } = this.state;
    this.getHistoricalRates(chosenCurrency, convertTo);
  }

  getHistoricalRates = (chosenCurrency, convertTo) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (45 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${chosenCurrency}&to=${convertTo}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } if (data) {
          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[convertTo]);
          const chartLabel = `${chosenCurrency}/${convertTo}`;
          this.buildChart(chartLabels, chartData, chartLabel);
        }
      })
      .catch(error => console.error(error.message));
  }
    buildChart = (labels, data, label) => {
      const chartRef = this.chartRef.current.getContext("2d");
      if (typeof this.chart !== "undefined") {
        this.chart.destroy();
      }
      this.chart = new Chart(chartRef, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: label,
              data,
              borderColor: 'white',
              backgroundColor: 'white',
              fill: false,
              tension: 0,
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              ticks: {
                color: 'white',
              }
            },
            x: {
              ticks: {
                color: 'white',
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
        }
      })
    }

  convertCurrencyTo = (currency) => {
    this.setState({ convertTo: currency});
  }

  chooseCurrency = (currency) => {
    this.setState({ chosenCurrency: currency});
  }

  handleSwap(event){
    event.preventDefault();
    let { chosenCurrency, convertTo } = this.state;
    this.setState({convertTo: chosenCurrency});
    this.setState({chosenCurrency: convertTo});
    fetch(`https://api.frankfurter.app/latest?from=${convertTo}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (!data) {
          throw new Error(data.Error);
        }
        if (data) {
          console.log(data.rates);
          this.setState({ results: data.rates, error: ''});
          this.getHistoricalRates(convertTo, chosenCurrency);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  handleChange(event){
    this.setState({ amountToConvert: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { chosenCurrency, convertTo } = this.state;
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
          this.getHistoricalRates(chosenCurrency, convertTo)
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
        <form className="form-inline my-4" onSubmit={this.handleSubmit} >
          <div className="row">
            <h2>Exchange Rate Converter</h2>
            <div className="col-12 col-md-4">
                <h4>From</h4>
                <DropdownMenu value={chosenCurrency} passCurrency={this.chooseCurrency} />
                <input type="number" className="form-control" id="custom-form1" onChange={this.handleChange} value={amountToConvert}/>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-secondary mt-5 swap" onClick={this.handleSwap}>
                <FaArrowsAltH />
              </button>
            </div>
            <div className="col-12 col-md-4">
                <h4>To</h4>
                <DropdownMenu value={convertTo} passCurrency={this.convertCurrencyTo} />
                <div className="px-2 pt-3 output" id="custom-form2">
                {(() => {
                  if (error) {
                    return error;
                  } if(chosenCurrency === convertTo){
                    return <p>{amountToConvert}</p>
                  } else {
                    if(isNaN(results[convertTo])){
                      return <p></p>;
                    } else {
                        return <p>{(amountToConvert*results[convertTo]).toFixed(4)}</p>;
                    }
                  }
                })()}  
                </div> 
            </div>
          </div>
          <div className="row my-4 row-adjust">
            <button type="submit" className="btn btn-secondary btn-custom">Convert</button>
          </div>
          <div className="row">
            <h2>{chosenCurrency}/{convertTo} Historical Rate</h2>
            <canvas ref={this.chartRef} />
          </div>
        </form>
      </div>
    );
  };
}

export default CurrencyConverter;