import React from 'react';

export const columns = [
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
      <button className='buy-button'> Buy </button>
    )
  }
];


export var chartConfigs = {
  "chart": {
    "caption": "Cryptocurrency current rate",
    "numberprefix": "$",
    "scrollheight": "10",
    "rotatelabels": "1",
    "showanchors": "0",
    "xAxisName": "Date",
    "yAxisName": "Value in USD",
    "theme": "fusion"
  }
};
