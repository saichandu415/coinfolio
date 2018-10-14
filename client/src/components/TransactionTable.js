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

function TransactionTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} numeric>Coin code</TableCell>
            <TableCell className={classes.tableCell} numeric>Quantity</TableCell>
            <TableCell className={classes.tableCell} numeric>Type</TableCell>
            <TableCell className={classes.tableCell} numeric>TimeStamp</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(props.data) && props.data.map(row => {
          return (
            <TableRow key={row.id} onClick={event => props.buyCurrency(event, row)}>
                  <TableCell component="th" scope="row">
                      {row.coinCd}
                  </TableCell>
                  <TableCell numeric>${(row.quantity).toFixed(18)}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell numeric>{moment(row.date).format("Do MMM YYYY")}</TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(TransactionTable);

//
//
