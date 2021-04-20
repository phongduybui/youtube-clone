/* eslint-disable import/no-anonymous-default-export */
import { FETCH_VIDEO_BY_ID } from "../actions/types"

export default (state = null, action) => {
  if(action.type === FETCH_VIDEO_BY_ID) {
    return action.payload[0] || state;
  }
  return state;
}