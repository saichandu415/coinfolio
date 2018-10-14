import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { store } from './../store';
import cssStyles from './../styles/App.css';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    fontWeight: 'bold',
    fontSize: "15px",
    color: 'black',
  },
  button: {
    margin: theme.spacing.unit,
  }
});

function CurrencyTable(props) {
  const { classes } = props;
  let data = store.getState().currency.details;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Currency</TableCell>
            <TableCell className={classes.tableCell} numeric>Price</TableCell>
            <TableCell className={classes.tableCell} numeric>1d Change</TableCell>
            <TableCell className={classes.tableCell} numeric>1d Volume</TableCell>
            <TableCell className={classes.tableCell} numeric>Hightest Price</TableCell>
            <TableCell className={classes.tableCell} numeric>Hightest Time</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(row => {
            return (
              <TableRow key={row.currency} onClick={event => props.buyCurrency(event, row)}>
                <TableCell component="th" scope="row">
                  {row.currency}
                </TableCell>
                <TableCell numeric>{isEmpty(row.close)? '': '$'+row.close}</TableCell>
                <TableCell numeric>{row.dayOpen}</TableCell>
                <TableCell numeric>{row.dayVolume}</TableCell>
                <TableCell numeric>{row.high}</TableCell>
                <TableCell numeric>{moment(row.highTimestamp).format("Do MMM YYYY")}</TableCell>
                <TableCell>
                  <button className={cssStyles.buyButton}> Buy </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(CurrencyTable);
