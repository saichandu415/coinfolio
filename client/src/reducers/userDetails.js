import { GET_USER_STATUS, UPDATE_USER_STATUS } from './../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
    status: false,
};

const userDetails = (state = initialState, action) => {
    switch (action.type) {

      case UPDATE_USER_STATUS:{
          return Object.assign({}, state, {
            status: action.userStatus
          });
        }
      case GET_USER_STATUS:{
          if(action.userStatus){
            return action.userStatus;
          }else{
            return Object.assign({}, state, {
              status: initialState.status
            });
          }
        }
      default:
        return state;
    }
  }

  export default userDetails;
