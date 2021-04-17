import { combineReducers } from 'redux';
import setBarClickReducer from './setBarClickReducer';
import channelReducer from './channelReducer';
import videoReducer from './videoReducer';
import isFetchingDataReducer from './setIsFetchingDataReducer';
import toggleDarkModeReducer from './toggleDarkModeReducer';

export default combineReducers({
  isBarClick: setBarClickReducer,
  homeVideos: videoReducer,
  homeChannels: channelReducer,
  isFetchingData: isFetchingDataReducer,
  isDarkMode: toggleDarkModeReducer,
});