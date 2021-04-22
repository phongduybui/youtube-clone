/* eslint-disable import/no-anonymous-default-export */
import { FETCH_COMMENTS, CLEAR_COMMENTS } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if(action.type === FETCH_COMMENTS) {
    return { 
      ...state, 
      ..._.mapKeys(action.payload.items, 'id'),
      nextPageToken: action.payload.nextPageToken
    }
  }
  if(action.type === CLEAR_COMMENTS) {
    return INITIAL_STATE;
  }
  return state;
}