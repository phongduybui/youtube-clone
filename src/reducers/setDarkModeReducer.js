import { SET_DARK_MODE } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  if(action.type === SET_DARK_MODE) {
    return !state;
  }
  return state;
}