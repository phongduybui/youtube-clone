import { SIGN_IN, SIGN_OUT } from '../actions/types';

const authReducer = (state = null, action) => {
  switch(action.type) {
    case SIGN_IN: 
      return action.payload;
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
}

export default authReducer;