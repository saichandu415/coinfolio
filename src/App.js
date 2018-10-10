import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import _ from 'lodash';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import './styles/App.css';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      currencyData: {
        "chart": {
          "caption": "Cryptocurrency current rate",
          "xAxisName": "Date",
          "yAxisName": "Value in USD",
          "theme": "fusion"
        }
      },
      isDataReceived: false,
      chartConfigs: {
        type: 'column2d',
        width: "90%",
        height: 400,
        dataFormat: 'json'
      }
    }

  }
  componentDidMount(){
      request.get('https://api.coinmarketcap.com/v2/ticker/?limit=10')
              .then(res=> {
                
                if(!_.isEmpty(res.body.data)){
                  let dataSet = [];
                  _.forIn(res.body.data, function(value, key) {
                    let data = {};
                    // console.log(value);
                    // console.log(moment(value.last_updated).format("Do MM YYYY"));
                    _.set(data, 'label',value.name);
                    _.set(data, 'value', _.round(value.quotes.USD.price, 2));
                    dataSet.push(data);
                  });

                  this.setState((prevState) => {
                    return {
                      currencyData: _.set(prevState.currencyData, "data", dataSet ),
                      chartConfigs: _.set(prevState.chartConfigs, "dataSource",this.state.currencyData),
                      isDataReceived: true
                    };
                  });
                }
              });
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <p className='logo'> CoinFolio </p>
          <p className='signUp'> Signup </p>
          <p className='login'> Login </p>
        </header>
        { this.state.isDataReceived &&
         <ReactFC {...this.state.chartConfigs} />
        }
        { !this.state.isDataReceived &&
         <p> Loading...</p>
        }
      </div>
    );
  }
}

export default App;
