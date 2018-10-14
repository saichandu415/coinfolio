import React from 'react';
import styles from './../styles/App.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import request from 'superagent';
import { store } from './../store';
import * as userActions from './../actions';
import FaBars from 'react-icons/lib/fa/bars';
import TransactionTable from './TransactionTable';
import * as content from './../constants/content.json';

let status = store.getState().userStatus.status;

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
       open: false,
       buttonVal: 'Check',
       password: '',
       confirmPassword: '',
       showPasswordField: false,
       emailId: '',
       isNewUser: false,
       err:"",
       isUserLoggedIn: false,
       openTransaction: false,
       transactionData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.buttonAction = this.buttonAction.bind(this);
    this.signUp = this.signUp.bind(this);
    this.showTransactions = this.showTransactions.bind(this);

  }

  componentDidMount(){
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      err: ''
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  buttonAction(){
    if(_.isEqualWith(this.state.buttonVal,'Check')){
      this.submitData();
    }else if(_.isEqualWith(this.state.buttonVal,'SignUp')){
       this.signUp()
    }else{
      this.loginUser();
    }
  }

  handleClose(){
      this.setState({
        open: false,
        openTransaction: false
       });
    }

  submitData = () => {
    if(!_.isEmpty(this.state.emailId)){
      request.get(content.userCheck)
         .query({ email: this.state.emailId})
         .then(res => {
           if(_.isEqualWith(res.status, 200) && !_.isEmpty(res.body)){
              this.setState({
                showPasswordField: true,
                buttonVal: "Login"
              });
           }else{
             this.setState({
               err: "User is not Registered. Kinldy Registered.",
               showPasswordField: true,
               isNewUser: true,
               buttonVal: "SignUp"
             });
           }

      });
    }
  };

  loginUser(){
    if(!_.isEmpty(this.state.password)){
      var body ={
        "email": this.state.emailId,
        "password": this.state.password,
      };
      request.post(content.validDateUser)
         .set('Content-Type', 'application/json')
         .send(body)
         .then(res => {
            if(_.isEqualWith(res.status, 200)  && !_.isEmpty(res.body)){
              this.handleClose();
              this.setState({
                isUserLoggedIn: true
              });
              status = store.dispatch(userActions.updateUserStatus(true)).userStatus;
              request.get(content.transactionDetails)
                   .query({ email: this.state.emailId})
                   .then(res => {
                     if(_.isEqualWith(res.status, 200) && !_.isEmpty(res.body)){
                        this.setState({
                          transactionData: res.body
                        });
                     }
                });
            }
            else{
              this.setState({
                  err: "Invalid Password!!",
              });
            }
      });
    }else{
      this.setState({
        err: "Password is empty. Invalid Password!!",
      });
    }
  }

  signUp(){
    if(!_.isEmpty(this.state.confirmPassword) && !_.isEmpty(this.state.password) && _.isEqualWith(this.state.confirmPassword, this.state.password)){
      var body ={
        "email": this.state.emailId,
        "password": this.state.password,
      };
      request.post(content.newUser)
         .set('Content-Type', 'application/json')
         .send(body)
         .then(res => {
            if(_.isEqualWith(res.status, 200)){
              this.handleClose();
              store.dispatch(userActions.updateUserStatus());
              this.setState({
                isUserLoggedIn: true
              });
              status = store.dispatch(userActions.updateUserStatus(true)).userStatus;
            }
            else{
              this.setState({
                  err: res.body.sqlMessage,
              });
            }
         });

    }else{
      this.setState({
          err: "Invalid Password or both passwords are not same!!",
      });
    }
  }

  showTransactions = async () => {
    this.setState({ openTransaction: true });
  }

  render() {
     const { classes } = this.props;
    return (
      <div>
        <header className={styles.appHeader}>
          <p className={styles.logo}>CoinFolio</p>
           { this.state.isUserLoggedIn &&
             <div onClick={this.showTransactions}>
               <FaBars size={25} className={styles.barIcon}/>
             </div>
           }
           { !this.state.isUserLoggedIn && <p className={styles.signUp} onClick={this.handleClickOpen}> SignUp/Login</p> }
           <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}>
                <DialogTitle id="form-dialog-title">Login/SignUp</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="emailId"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={this.state.emailId}
                    onChange={this.handleChange('emailId')}
                  />
                  {this.state.showPasswordField &&
                    <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    fullWidth
                  />}

                  {this.state.isNewUser &&
                    <TextField
                    autoFocus
                    margin="dense"
                    id="confirm_password"
                    label=" Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                    fullWidth
                  />}
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.buttonAction} color="primary">
                    {this.state.buttonVal}
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
                {this.state.err && <p className={styles.errorMessage}>{this.state.err}</p>}
           </Dialog>
           <Dialog
                open={this.state.openTransaction}
                onClose={this.handleClose}
                onBackdropClick={this.handleClose}
                scroll={'paper'}
                aria-labelledby="form-dialog-title"
                fullWidth={true}>
                <DialogTitle id="form-dialog-title">Transactions</DialogTitle>
                <TransactionTable data={this.state.transactionData}/>
           </Dialog>
        </header>
      </div>
    );
  }
}
