import React, { Component } from 'react';
import request from 'superagent';
// eslint-disable-next-line 
import moment from 'moment';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import _ from 'lodash';

import ReactTable from "react-table";
import 'react-table/react-table.css'

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import './styles/App.css';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyData: {
        "chart": {
          "caption": "Cryptocurrency current rate",
          "xAxisName": "Date",
          "yAxisName": "Value in USD",
          "theme": "fusion"
        }
      },
      chartConfigs: {
        type: 'column2d',
        width: "90%",
        height: 400,
        dataFormat: 'json'
      },
      isDataReceived: false,
      data: []
    }

  }
  componentDidMount() {
    request.get('https://api.coinmarketcap.com/v2/ticker/?limit=20')
      .then(res => {

        var dataSet = [];
        if (!_.isEmpty(res.body.data)) {
          _.forIn(res.body.data, function (value) {
            dataSet.push(value);
          });

          this.setState({
              isDataReceived: true,
              data: dataSet
          });

          // this.setState((prevState) => {
          //   return {
          //     currencyData: _.set(prevState.currencyData, "data", dataSet ),
          //     chartConfigs: _.set(prevState.chartConfigs, "dataSource",this.state.currencyData),
          //     isDataReceived: true,

          //   };
          // });
        }
      });
  }
  render() {

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => <p>{props.value}</p>
      }, {
        Header: 'Symbol',
        accessor: 'symbol',
        Cell: props => <p>{props.value}</p>
      },
      {
        Header: 'Rank',
        accessor: 'rank',
        Cell: props => <p className='number'>{props.value}</p>
      },
      {
        id: 'Price',
        Header: 'Price',
        accessor: d => d.quotes.USD.price,
        Cell: props => <p className='number'>${props.value}</p>
      },
      {
        Header: props => <span>Total Supply</span>,
        accessor: 'total_supply',
        Cell: props => <p className='number'>{props.value}</p>
      },
      {
        Header: props => <span>Circulating Supply</span>,
        accessor: 'circulating_supply',
        Cell: props => <p className='number'>{props.value}</p>
      },
      {
        id: 'percent_change_1h',
        Header: props => <span>Change in 1 hr</span>,
        accessor: d => d.quotes.USD.percent_change_1h,
        Cell: row => (
            <div
              style={{
                color:
                  row.value > 0
                    ? "#85cc00"
                      : "#ff2e00",
              }}
            >
               <p>{row.value}%</p>
            </div>
        )
      },
      {
        id: 'percent_change_24h',
        Header: props => <span>Change in 24hr</span>,
        accessor: d => d.quotes.USD.percent_change_24h,
        Cell: row => (
          <div
            style={{
              color:
                row.value > 0
                  ? "#85cc00"
                    : "#ff2e00",
            }}
          >
             <p>{row.value}%</p>
          </div>
      )
      },
      {
        id: 'percent_change_7d',
        Header: props => <span>Change in 7 days</span>,
        accessor: d => d.quotes.USD.percent_change_7d,
        Cell: row => (
          <div
            style={{
              color:
                row.value > 0
                  ? "#85cc00"
                    : "#ff2e00",
            }}
          >
             <p>{row.value}%</p>
          </div>
        )  
      },
      {
        Cell: () => (
          <button className= 'buy-button'> Buy </button>
        )  
      }
    ];


    return (
      <div>
        <header className="App-header">
          <p className='logo'> CoinFolio </p>
          <p className='signUp'> Signup </p>
          <p className='login'> Login </p>
        </header>
        <div className='data-table'>
          {this.state.isDataReceived &&

            <ReactTable data={this.state.data} columns={columns} showPagination={false}/>
          }
          {!this.state.isDataReceived &&
            <p> Loading...</p>
          }
           {/*<ReactFC {...this.state.chartConfigs} />  */}
        </div>

      </div>
    );
  }
}

export default App;
