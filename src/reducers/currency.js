import { RECEIVE_DETAILS } from './../constants/ActionTypes';
import _ from 'lodash';


const initialState = {
    details: [],
};

const currency = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_DETAILS:{
        var dataSet = [];
        if (!_.isEmpty(action.details)) {
          _.forIn(action.details, function (value) {
            dataSet.push(value);
          });
        return [...state, dataSet];
        } 
      }
      default:
        return state;
    }
  }
  
  export default currency;
  