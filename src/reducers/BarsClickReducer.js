/* eslint-disable import/no-anonymous-default-export */
import { BARS_CLICK } from '../actions/types';

export default (state = false, action) => {
  switch(action.type) {
    case BARS_CLICK:
      return !state;
    default:
      return state;
  }
}