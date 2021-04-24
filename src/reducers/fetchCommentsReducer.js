/* eslint-disable import/no-anonymous-default-export */
import { FETCH_COMMENTS, CLEAR_COMMENTS, FETCH_MY_COMMENT } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_COMMENTS:
      return { 
        ...state, 
        ..._.mapKeys(action.payload.items, 'id'),
        nextPageToken: action.payload.nextPageToken
      }
    case FETCH_MY_COMMENT:
      return {
        ...action.payload,
        ...state
      }
    case CLEAR_COMMENTS:
      return INITIAL_STATE;
    default:
      return state;

  }

}