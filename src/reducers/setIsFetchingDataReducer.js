import { SET_IS_FETCHING_DATA } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  if(action.type === SET_IS_FETCHING_DATA) {
    return action.payload;
  }
  return state;
}