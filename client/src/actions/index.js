import * as types from './../constants/ActionTypes';

export const receiveDetails = details => ({
    type: types.RECEIVE_DETAILS,
    details
});

export const updateUserStatus = userStatus => ({
  type: types.UPDATE_USER_STATUS,
  userStatus
});
export const getUserStatus = userStatus => ({
  type: types.GET_USER_STATUS,
  userStatus
});
