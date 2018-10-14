import { RECEIVE_DETAILS } from './../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
    details: [],
};

const currency = (state = initialState, action) => {
    switch (action.type) {

      case RECEIVE_DETAILS:{
          var dataSet = [], detailObj = action.details.body;
          if (!_.isEmpty(detailObj)) {
            dataSet = _.filter(detailObj, function(value) {
              return (!_.isNull(value.close));
            });
          return {
              ...state,
              details: dataSet
            }
          }
        }

      default:
        return state;
    }
  }

  export default currency;
