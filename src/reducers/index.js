import { combineReducers } from 'redux';
import BarsClickReducer from './BarsClickReducer';

export default combineReducers({
  isBarsClick: BarsClickReducer
});