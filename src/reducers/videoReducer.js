/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { FETCH_HOME_VIDEOS } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_HOME_VIDEOS:
      return { 
        ...state, 
        ..._.mapKeys(action.payload.items, 'id'),
        nextPageToken: action.payload.nextPageToken
      };
    default:
      return state;
  }
}