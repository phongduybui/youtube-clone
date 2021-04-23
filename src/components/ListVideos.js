/* eslint-disable react-hooks/exhaustive-deps */
import "./ListVideos.css";
import React, { useEffect } from "react";
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { connect } from "react-redux";
import { fetchHomeVideosAndChannels, setIsFetchingData } from "../actions";
import convertDuration from "../helpers/convertDuration";
import { viewString } from "../helpers/convertViewCount";
import VideoItem from "./VideoItem";
import VideoItemSkeleton from './VideoItemSkeleton';

const ListVideos = ({
  homeVideos,
  nextPageToken,
  isFetchingData,
  fetchHomeVideosAndChannels,
  setIsFetchingData,
}) => {

  useEffect(() => {
    setIsFetchingData(true);
    fetchHomeVideosAndChannels();
  }, []); 

  const [isFetching, setFetching] = useInfiniteScroll(fetchMoreVideos);

  function fetchMoreVideos() {
    setIsFetchingData(isFetching); //true
    fetchHomeVideosAndChannels(nextPageToken);
    setFetching(isFetchingData);
  }

  const renderHomeVideos = () => {
    return homeVideos.map((video) => {
      if(typeof video === 'object') {
        const { 
          title, 
          channelTitle,
          channelId,
          thumbnails, 
          publishedAt 
        } = video.snippet;

        return (
          <VideoItem
            id={video.id}
            channelId={channelId}
            title={title}
            channelTitle={channelTitle}
            thumbnails={thumbnails}
            publishedAt={publishedAt}
            duration={convertDuration(video.contentDetails?.duration)}
            viewCount={viewString(video.statistics?.viewCount)}
            key={video.id}
          />
        );
      }
      return null;
    });
  };

  return (
    <div className="list-videos">
      <div className="list-videos-wrapper">
        {renderHomeVideos()}
        {isFetchingData && <VideoItemSkeleton count={8} />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  homeVideos: Object.values(state.homeVideos),
  nextPageToken: state.homeVideos.nextPageToken,
  isFetchingData: state.isFetchingData,
});

const mapDispatchToProps = { 
  fetchHomeVideosAndChannels, 
  setIsFetchingData 
};

export default connect(mapStateToProps, mapDispatchToProps)(ListVideos);
