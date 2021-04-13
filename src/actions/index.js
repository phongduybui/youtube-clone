import {
  BARS_CLICK,
  FETCH_HOME_VIDEOS,
  FETCH_CHANNEL,
  SET_IS_FETCHING_DATA,
  SET_DARK_MODE,
} from "./types";
import youtube from "../apis/youtube";
import _ from "lodash";

export const setDarkMode = () => {
  return {
    type: SET_DARK_MODE,
  }
}

export const barsClick = () => {
  return {
    type: BARS_CLICK,
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
