import _ from "lodash";
import history from '../history';
import {
  SET_BAR_CLICK,
  FETCH_HOME_VIDEOS,
  FETCH_CHANNEL,
  SET_IS_FETCHING_DATA,
  TOGGLE_DARK_MODE,
  FETCH_VIDEOS_BY_TERM,
  FETCH_CHANNEL_SEARCH_RESULTS,
  FETCH_VIDEO_BY_ID,
} from "./types";
import youtube from "../apis/youtube";

export const toggleDarkMode = () => {
  return {
    type: TOGGLE_DARK_MODE,
  }
}

export const setBarClick = (value) => {
  return {
    type: SET_BAR_CLICK,
    payload: value
  };
};

export const setIsFetchingData = (isFetchingData) => {
  return {
    type: SET_IS_FETCHING_DATA,
    payload: isFetchingData
  };
};

export const fetchHomeVideosAndChannels = (nextPageToken) => async (
  dispatch,
  getState
) => {
  await dispatch(fetchHomeVideos(nextPageToken));

  const channelIds = _.uniq(
    _.map(getState().homeVideos, (video) => {
      if (typeof video === "object") {
        return video.snippet.channelId;
      }
      return "";
    })
  );
  channelIds.forEach((id) => dispatch(fetchChannel(id)));
  dispatch(setIsFetchingData(false));
};

// export const fetchHomeVideos = (nextPageToken) => async (dispatch) => {

//   const response = await youtube.get('/videos', {
//     params: {
//       part: 'snippet, contentDetails, statistics',
//       chart: 'mostPopular',
//       regionCode: 'VN',
//       pageToken: nextPageToken,
//       maxResults: 20
//     }
//   })

//   dispatch({ type: FETCH_HOME_VIDEOS, payload: response.data });
// };

export const fetchHomeVideos = (nextPageToken) => async (dispatch) =>
  _fetchHomeVideos(nextPageToken, dispatch);

const _fetchHomeVideos = _.memoize(async (nextPageToken, dispatch) => {
  const response = await youtube.get("/videos", {
    params: {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "VN",
      pageToken: nextPageToken,
      maxResults: 20,
    },
  });

  dispatch({ type: FETCH_HOME_VIDEOS, payload: response.data });
});

// export const fetchChannel = (channelId) => async (dispatch) => {
//   const response = await youtube.get('/channels', {
//     params: {
//       part: 'snippet, statistics',
//       id: channelId
//     }
//   })

//   dispatch({ type: FETCH_CHANNEL, payload: response.data.items });
// };

// With memoize method of lodash

export const fetchChannel = (channelId) => (dispatch) =>
  _fetchChannel(channelId, dispatch);

const _fetchChannel = _.memoize(async (channelId, dispatch) => {
  const response = await youtube.get("/channels", {
    params: {
      part: "snippet, statistics",
      id: channelId,
    },
  });

  dispatch({ type: FETCH_CHANNEL, payload: response.data.items });
});

export const fetchVideosByTerm = term => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      part: 'snippet',
      q: term,
      type: 'video',
      maxResults: 20,
    }
  });

  dispatch({ type: FETCH_VIDEOS_BY_TERM, payload: response.data });
}

export const fetchChannelSearchResults = (id) => dispatch => {
  _fetchChannelSearchResults(id, dispatch)
};
const _fetchChannelSearchResults = _.memoize(async (id, dispatch) => {
  const response = await youtube.get('/channels', {
    params: {
      part: "snippet, statistics",
      id: id,
    }
  })

  dispatch({ type: FETCH_CHANNEL_SEARCH_RESULTS, payload: response.data.items})
})

export const fetchVideosAndChannelsByTerm = (term, isSearch) => async (dispatch, getState) => {
  await dispatch(fetchVideosByTerm(term));

  const channelIds = _.uniq(_.map(getState().searchResults.videos, video => {
    return video.snippet.channelId
  }));
  channelIds.forEach(id => dispatch(fetchChannelSearchResults(id)));
  dispatch(setIsFetchingData(false));

  if(isSearch) {
    history.push('/search-results');
  }
}

export const fetchVideoById = (id) => async (dispatch, getState) => {
  const response = await youtube.get('/videos', {
    params: {
      id,
      part: 'snippet, statistics'
    }
  })

  dispatch({ type: FETCH_VIDEO_BY_ID, payload: response.data.items });
  dispatch(fetchChannel(getState().currentVideo?.snippet.channelId));
  dispatch(fetchVideosAndChannelsByTerm(getState().currentVideo?.snippet.title));
}