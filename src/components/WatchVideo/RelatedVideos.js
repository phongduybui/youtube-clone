import React from "react";
import { connect } from "react-redux";
import { fetchVideosAndChannelsByTerm as fetchMore } from '../../actions';
import VideoItem from "../VideoItem";
import VideoItemSkeleton from "../VideoItemSkeleton";

const RelatedVideos = (props) => {
  return (
    <div className="related-videos">
      {props.relatedVideos.map((video) => {
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
      {props.isFetchingData && (
        <VideoItemSkeleton count={8} className="video-item--related" />
      )}
      <button 
        className="btn-toggle menu__btn btn-show-more"
        onClick={() => props.fetchMore(props.nextToken, props.videoOfChannel)}
      >Hiển thị thêm
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({ 
  isFetchingData: state.isFetchingData,
  videoOfChannel: state.currentVideo?.snippet.channelTitle,
  nextToken: state.searchResults.nextPageToken,
});

export default connect(mapStateToProps, { fetchMore })(RelatedVideos);
