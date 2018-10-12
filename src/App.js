import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import _ from 'lodash';

// Css Styles
import './styles/App.css';

//Custom components imports
import * as content from './content.json';
import HomeScreen from './screens/homeScreen/HomeScreen';

//Actions
import * as currencyActions from './actions';
import { store } from './index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataReceived: false,
      data: [],
      data2: [],
      chartCategory: [],
      chartDataset: []
    }
  }
  componentDidMount() {
    request.get(content.getCoinDetails)
      .then(res => {
        var dataSet = [];
        if (!_.isEmpty(res.body.data)) {
          _.forIn(res.body.data, function (value) {
            dataSet.push(value);
          });
          store.dispatch(currencyActions.receiveDetails(dataSet))

          this.setState({
            isDataReceived: true,
            data: dataSet
          });
        }
      });

      let categoryDetails = [], chartBodyArr = [], categoriesArr= [], categories = [];

      request.get(content.getCurrenciesSparkline)
        .then(res => {
          _.forEach((content.supportedCoins).split(","), function(value) {
            let chartBody = {}, priceList = [];
            let currenyDetails = _.nth(res.body, _.findIndex(res.body, function(o) { return o.currency === value; }));
            categoryDetails = currenyDetails.timestamps;
            _.set(chartBody, "seriesname", currenyDetails.currency);
            _.forEach(currenyDetails.prices, function(priceVal){
              priceList.push(_.set({}, "value", _.toNumber(priceVal)));
            });

            _.set(chartBody, "data", priceList);
            chartBodyArr.push(chartBody);
          });

          _.forEach(categoryDetails, function(categoryVal){
            categoriesArr.push( _.set({}, "label", moment(categoryVal).format('Do MMM YYYY')));
          });

          categories.push(_.set({}, "category", categoriesArr));
          
          this.setState((prevState) => {
            return {
              chartCategory: categories,
              chartDataset: chartBodyArr
            };
          });
        });  

      request.get(content.getCurrenciesDashboard)
      .then(res => {
        console.log();
        this.setState({
          data2: res.body
        });
      });  
      console.log(store.getState());
      console.log();
      console.log(store.getState());
  }
  render() {

    return (
      <div>
        <header className="App-header">
          <p className='logo'> CoinFolio </p>
          <p className='signUp'> Signup </p>
          <p className='login'> Login </p>
        </header>
        <div className='data-table'>
          {this.state.isDataReceived &&
            <HomeScreen 
                  data={this.state.data}
                  chartCategory={this.state.chartCategory} 
                  chartDataset={this.state.chartDataset}
                  data2={this.state.data2}
                  />
          }
        </div>
      </div>
    );
  }
}
