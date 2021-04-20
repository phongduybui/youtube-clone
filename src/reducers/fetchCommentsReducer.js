/* eslint-disable import/no-anonymous-default-export */
import { FETCH_COMMENTS } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  if(action.type === FETCH_COMMENTS) {
    return { ..._.mapKeys(action.payload.items, 'id') };
  }
  return state;
}