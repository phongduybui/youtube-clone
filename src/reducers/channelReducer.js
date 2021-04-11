/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { FETCH_CHANNEL } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_CHANNEL:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    default:
      return state;
  }
}