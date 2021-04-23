import _ from "lodash";
import {
  SET_BAR_CLICK,
  FETCH_HOME_VIDEOS,
  FETCH_CHANNEL,
  SET_IS_FETCHING_DATA,
  TOGGLE_DARK_MODE,
  FETCH_VIDEOS_BY_TERM,
  FETCH_CHANNEL_SEARCH_RESULTS,
  FETCH_VIDEO_BY_ID,
  FETCH_COMMENTS,
  CLEAR_COMMENTS,
  UPDATE_SEARCH_TERM,
  CLEAR_SEARCH_RESULTS,
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
      maxResults: 12,
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

export const fetchVideosByTerm = (nextPageToken, term) => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      part: 'snippet',
      q: term,
      type: 'video',
      pageToken: nextPageToken,
      maxResults: 5,
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

export const fetchVideosAndChannelsByTerm = (nextPageToken, term) => async (dispatch, getState) => {
  if(!term) {
    return;
  }
  
  await dispatch(fetchVideosByTerm(nextPageToken, term));

  const channelIds = _.uniq(_.map(getState().searchResults.videos, video => {
    return video.snippet.channelId
  }));
  channelIds.forEach(id => dispatch(fetchChannelSearchResults(id)));
  dispatch(setIsFetchingData(false));
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
  dispatch(clearSearchResults());
  dispatch(fetchVideosAndChannelsByTerm(null, getState().currentVideo?.snippet.channelTitle));
  dispatch(setIsFetchingData(false));
}

export const fetchComments = (videoId, nextPageToken) => async dispatch => {
  const response = await youtube.get('/commentThreads', {
    params: {
      part: 'snippet, id',
      videoId,
      pageToken: nextPageToken,
      maxResults: 5
    }
  })

  dispatch({ type: FETCH_COMMENTS, payload: response.data });
  dispatch(setIsFetchingData(false));
}

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  }
}

export const updateSearchTerm = (term) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: term
  }
}

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS
  }
}