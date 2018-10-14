import React, { Component } from 'react';
import _ from 'lodash';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Css Styles
import * as common from './../../common';
import { store } from './../../store';

//Custom components imports
import CurrencyTable from './../../components/CurrencyTable';
Charts(FusionCharts);

export default class HomeScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
      }
      this.buyCurrency = this.buyCurrency.bind(this);
    }
    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
       if((this.props.chartDataset !== nextProps.chartDataset) && this.props.chartCategory !== nextProps.chartCategory){
           _.set(common.chartConfigs, 'categories', nextProps.chartCategory );
           _.set(common.chartConfigs, 'dataset', nextProps.chartDataset );
       }
    }

    buyCurrency(e, info){
      console.log(info);
    }

    render() {
        return (
            <div>
                <ReactFusioncharts
                    type = "msline"
                    width = '100%'
                    height = '700'
                    dataFormat = "JSON"
                    dataSource = {common.chartConfigs} />
                <CurrencyTable buyCurrency={this.buyCurrency}/>
            </div>
        );
    }
}
