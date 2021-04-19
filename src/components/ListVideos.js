/* eslint-disable react-hooks/exhaustive-deps */
import "./ListVideos.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchHomeVideosAndChannels, setIsFetchingData } from "../actions";
import convertDuration from "../helpers/convertDuration";
import convertViewCount from "../helpers/convertViewCount";
import VideoItem from "./VideoItem";
import SkeletonFake from './SkeletonFake';

const ListVideos = ({
  homeVideos,
  nextPageToken,
  fetchHomeVideosAndChannels,
  setIsFetchingData,
}) => {

  useEffect(() => {
    setIsFetchingData(true);
    fetchHomeVideosAndChannels();
  }, []); 

  useEffect(() => {
    const onScroll = () => {
      //At the bottom of the page: show loading spinner and make fetch request to api
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsFetchingData(true);
        fetchHomeVideosAndChannels(nextPageToken);     
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [nextPageToken]);

  const renderHomeVideos = () => {
    if (homeVideos) {
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
              viewCount={convertViewCount(video.statistics?.viewCount)}
              key={video.id}
            />
          );
        }
        return null;
      });
    }
  };

  return (
    <div className="list-videos">
      <div className="list-videos-wrapper">
        {renderHomeVideos()}
        <SkeletonFake />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  homeVideos: Object.values(state.homeVideos),
  nextPageToken: state.homeVideos.nextPageToken,
});

const mapDispatchToProps = { fetchHomeVideosAndChannels, setIsFetchingData };

export default connect(mapStateToProps, mapDispatchToProps)(ListVideos);
