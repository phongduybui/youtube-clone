/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { FETCH_HOME_VIDEOS } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_HOME_VIDEOS:
      const newState = { ...state, ..._.mapKeys(action.payload.items, 'id') };
      newState.nextPageToken = action.payload.nextPageToken;
      return newState;
    default:
      return state;
  }
}