import React from "react";
import VideoItem from "./VideoItem";

const VideoItemSkeleton = ({ count, className }) => {
  return (
    <React.Fragment>
      {Array(count)
        .fill()
        .map((video, index) => (
          <VideoItem className={className} key={index} />
        ))}
    </React.Fragment>
  );
};

VideoItemSkeleton.defaultProps = {
  count: 1,
}

export default VideoItemSkeleton;
