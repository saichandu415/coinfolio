import React, { Component } from 'react';
import _ from 'lodash';

import ReactTable from "react-table";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFusioncharts from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';
import MediaQuery from 'react-responsive';

// Css Styles
import 'react-table/react-table.css';
import * as config from './../../config';

//Custom components imports
Charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const columnsConfig = [
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
            <button className='buy-button' onClick={console.log("Buy")}> Buy </button>
        )
    }
];

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
                <MediaQuery query="(min-device-width: 1224px)">
                    <ReactFusioncharts
                                type = "msline"
                                width = '100%'
                                height = '700'
                                dataFormat = "JSON"
                                dataSource = {config.chartConfigs} />
                    <ReactTable data={this.props.data} columns={columnsConfig} showPagination={false} />             
                </MediaQuery>
                <MediaQuery query="(min-device-width: 1824px)">
                    <ReactFusioncharts
                                    type = "msline"
                                    width = '100%'
                                    height = '700'
                                    dataFormat = "JSON"
                                    dataSource = {config.chartConfigs} />
                    <ReactTable data={this.props.data} columns={columnsConfig} showPagination={false} />                
                </MediaQuery>
                <MediaQuery query="(max-width: 1224px)">
                        <ReactFusioncharts
                            type = "msline"
                            width = '100%'
                            height = '700'
                            dataFormat = "JSON"
                            dataSource = {config.chartConfigs} />
                        <ReactTable data={this.props.data} columns={columnsConfig} showPagination={false} />
                </MediaQuery>
                
                
            </div>
        );
    }
}


