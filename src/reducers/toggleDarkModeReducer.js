import { TOGGLE_DARK_MODE } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  if(action.type === TOGGLE_DARK_MODE) {
    return !state;
  }
  return state;
}