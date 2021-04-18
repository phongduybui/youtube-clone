/* eslint-disable import/no-anonymous-default-export */
import { FETCH_VIDEOS_BY_TERM, FETCH_CHANNEL_SEARCH_RESULTS  } from '../actions/types';
import _ from 'lodash';

const initStateSearch = {
  videos: {},
  channels: {}
};

export default (state = initStateSearch, action) => {
  switch(action.type) {
    case FETCH_VIDEOS_BY_TERM:
      return { 
        ...state,
        videos: {
          // Override old search term results 
          ..._.mapKeys(action.payload.items, video => video.id.videoId)
        }
      };
    case FETCH_CHANNEL_SEARCH_RESULTS:
      return {
        ...state,
        channels: {
          // Add new channel to list, fetch 1 channel/per time, not override old search results
          ...state.channels,
          ..._.mapKeys(action.payload, 'id')
        }
      };
    default:
      return state;
  }
}