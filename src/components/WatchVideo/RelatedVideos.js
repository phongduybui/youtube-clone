import React from "react";
import { connect } from "react-redux";
import VideoItem from "../VideoItem";
import VideoItemSkeleton from "../VideoItemSkeleton";

const RelatedVideos = ({ relatedVideos, isFetchingData }) => {
  return (
    <div className="related-videos">
      {relatedVideos.map((video) => {
        const { title, channelTitle, thumbnails, publishedAt } = video.snippet;

        return (
          <VideoItem
            className="video-item--related"
            id={video.id.videoId}
            title={title}
            channelTitle={channelTitle}
            thumbnails={thumbnails}
            publishedAt={publishedAt}
            key={video.id.videoId}
          />
        );
      })}
      {isFetchingData && (
        <VideoItemSkeleton count={8} className="video-item--related" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ isFetchingData: state.isFetchingData });

export default connect(mapStateToProps)(RelatedVideos);
