import {
  SET_BAR_CLICK,
  FETCH_HOME_VIDEOS,
  FETCH_CHANNEL,
  SET_IS_FETCHING_DATA,
  TOGGLE_DARK_MODE,
  FETCH_VIDEOS_BY_TERM,
} from "./types";
import youtube from "../apis/youtube";
import _ from "lodash";

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

export const fetchVideosByTerm = term => dispatch => _fetchVideosByTerm(term, dispatch);
const _fetchVideosByTerm = _.memoize(async (term, dispatch) => {
  const response = await youtube.get('/search', {
    part: "snippet, contentDetails, statistics",
    q: term,
    maxResults: 20
  });

  dispatch({ type: FETCH_VIDEOS_BY_TERM, payload: response.data });
});

export const fetchVideoSAndChannelsByTerm = (term) => async (dispatch, getState) => {
  await dispatch(fetchVideosByTerm(term));

  const channelIds = _.uniq(_.map(getState().searchResults, video => video.snippet.id));
  channelIds.forEach(id => dispatch(fetchChannel(id)));
}