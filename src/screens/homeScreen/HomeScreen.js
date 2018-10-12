import React, { Component } from 'react';
import _ from 'lodash';

import ReactTable from "react-table";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
// import MediaQuery from 'react-responsive';

// Css Styles
import 'react-table/react-table.css';
import * as config from './../../config';

//Custom components imports
Charts(FusionCharts);

export default class HomeScreen extends Component {
    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
       if((this.props.chartDataset !== nextProps.chartDataset) && this.props.chartCategory !== nextProps.chartCategory){
           _.set(config.chartConfigs, 'categories', nextProps.chartCategory );
           _.set(config.chartConfigs, 'dataset', nextProps.chartDataset );
       }
      }
    render() {
        return (
            <div>
                <ReactFusioncharts
                    type = "msline"
                    width = '100%'
                    height = '700'
                    dataFormat = "JSON"
                    dataSource = {config.chartConfigs} />
                {/*<ReactTable 
                    data={this.props.data} 
                    columns={config.columnsConfig} 
                showPagination={false} />*/}
                <ReactTable 
                    data={this.props.data2} 
                    columns={config.columnsConfig2} 
                    showPagination={false} />    
            </div>
        );
    }
}


