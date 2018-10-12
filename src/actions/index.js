import * as types from './../constants/ActionTypes';

export const receiveDetails = details => ({
    type: types.RECEIVE_DETAILS,
    details
  })
  