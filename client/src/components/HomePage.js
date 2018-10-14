import React, {Component} from 'react';
import request from 'superagent';
import moment from 'moment';
import _ from 'lodash';

// Css Styles
import styles from './../styles/App.css';

//Custom components imports
import * as content from './../constants/content.json';
import HomeScreen from './../screens/homeScreen/HomeScreen';

//Actions
import * as currencyActions from './../actions';
import { store } from './../store';
import Header from './Header';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataReceived: false,
      chartCategory: [],
      chartDataset: []
    }
  }
  componentDidMount() {
    let categoryDetails = [],
      chartBodyArr = [],
      categoriesArr = [],
      categories = [];

    request
      .get(content.getCurrenciesDashboard)
      .then(res => {
        store.dispatch(currencyActions.receiveDetails(res));
        this.setState({isDataReceived: true});
      });

    request
      .get(content.getCurrenciesSparkline)
      .then((res) => {
        _.forEach((content.supportedCoins).split(","), function (value) {
            var chartBody = {}, priceList = [], currenyDetails = [];
            currenyDetails = _.nth(res.body, _.findIndex(res.body, function (o) {
              return o.currency === value;
            }));
            categoryDetails = currenyDetails.timestamps;
            _.set(chartBody, "seriesname", currenyDetails.currency);
            _.forEach(currenyDetails.prices, function (priceVal) {
              priceList.push(_.set({}, "value", _.toNumber(priceVal)));
            });

            _.set(chartBody, "data", priceList);
            chartBodyArr.push(chartBody);
          });

        _.forEach(categoryDetails, function (categoryVal) {
          categoriesArr.push(_.set({}, "label", moment(categoryVal).format('Do MMM YYYY')));
        });

        categories.push(_.set({}, "category", categoriesArr));

        this.setState({
          chartCategory: categories,
          chartDataset: chartBodyArr
        });
      });

  }


  render() {

    return (
      <div>
        <Header/>
        <div className={styles.dataTable}>
          {this.state.isDataReceived &&
            <HomeScreen
                chartCategory={this.state.chartCategory}
                chartDataset={this.state.chartDataset}/>
          }
          {!this.state.isDataReceived &&  <p>Loading... </p> }
        </div>
      </div>
    );
  }
}
