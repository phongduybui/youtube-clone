/* eslint-disable import/no-anonymous-default-export */
import { SET_BAR_CLICK } from '../actions/types';

export default (state = false, action) => {
  if(action.type === SET_BAR_CLICK) {
    return action.payload;
  }
  return state;
}