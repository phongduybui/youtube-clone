/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_VIDEOS_BY_TERM,
  FETCH_CHANNEL_SEARCH_RESULTS,
  UPDATE_SEARCH_TERM,
  CLEAR_SEARCH_RESULTS,
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  videos: {},
  channels: {},
  searchTerm: '',
  nextPageToken: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_VIDEOS_BY_TERM:
      return { 
        ...state,
        videos: {
          ...state.videos,
          ..._.mapKeys(action.payload.items, video => video.id.videoId),
        },
        nextPageToken: action.payload.nextPageToken
      };
    case FETCH_CHANNEL_SEARCH_RESULTS:
      return {
        ...state,
        channels: {
          ...state.channels,
          ..._.mapKeys(action.payload, 'id')
        }
      };
    case UPDATE_SEARCH_TERM: 
      return {
        ...INITIAL_STATE,
        searchTerm: action.payload
      }
    case CLEAR_SEARCH_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}