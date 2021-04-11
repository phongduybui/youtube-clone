import { combineReducers } from 'redux';
import BarsClickReducer from './BarsClickReducer';
import channelReducer from './channelReducer';
import videoReducer from './videoReducer';

export default combineReducers({
  isBarsClick: BarsClickReducer,
  homeVideos: videoReducer,
  homeChannels: channelReducer
});