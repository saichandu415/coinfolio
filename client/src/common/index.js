import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import styles from './../styles/App.css';

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

export const columnsConfig = [
  {
    Header: 'Currency',
    accessor: 'currency',
    Cell: props => <p>{props.value}</p>
  }, {
    Header: 'Price',
    accessor: 'close',
    Cell: props => <p>{isEmpty(props.value)? '': '$'+props.value}</p>
  },
  {
    Header: '1d Change',
    accessor: 'dayOpen',
    Cell: props => <p className='number'>{props.value}</p>
  },
  {
    Header: '1d Volume',
    accessor: 'dayVolume',
    Cell: props => <p className='number'>{props.value}</p>
  },
  {
    Header: 'Hightest Price',
    accessor: 'high',
    Cell: props => <p className='number'>{props.value}</p>
  },
  {
    Header: 'Hightest Time',
    accessor: 'highTimestamp',
    Cell: props => (<p className='number'>{moment(props.value).format("Do MMM YYYY")}</p>)
  },
  {
    Cell: () => (
      <button className={styles.buyButton}> Buy </button>
    )
  }
];
