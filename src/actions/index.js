import { BARS_CLICK, FETCH_HOME_VIDEOS, FETCH_CHANNEL } from "./types";
import youtube from '../apis/youtube';
import _ from 'lodash';

export const barsClick = () => {
  return {
    type: BARS_CLICK,
  };
};

export const fetchHomeVideosAndChannels = () => async (dispatch, getState) => {
  await dispatch(fetchHomeVideos());

  const channelIds = _.uniq(_.map(getState().homeVideos, video => {
    if(typeof video === 'object') {
      return video.snippet.channelId;
    }
    return '';
  }));
  channelIds.forEach(id => dispatch(fetchChannel(id)));

};

export const fetchHomeVideos = () => async (dispatch) => {
  const response = await youtube.get('/videos', {
    params: {
      part: 'snippet, contentDetails, statistics',
      chart: 'mostPopular',
      regionCode: 'VN',
      maxResults: 20
    }
  })

  dispatch({ type: FETCH_HOME_VIDEOS, payload: response.data });
};

export const fetchChannel = (channelId) => async (dispatch) => {
  const response = await youtube.get('/channels', {
    params: {
      part: 'snippet, statistics',
      id: channelId
    }
  })

  dispatch({ type: FETCH_CHANNEL, payload: response.data.items });
};