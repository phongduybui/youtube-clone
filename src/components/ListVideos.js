import "./ListVideos.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchHomeVideosAndChannels, setIsFetchingData } from "../actions";
import useWindowDimensions from '../hooks/useWindowDimensions';
import convertDuration from "../helpers/convertDuration";
import convertViewCount from "../helpers/convertViewCount";
import VideoItem from "./VideoItem";

const ListVideos = ({
  homeVideos,
  isBarClick,
  nextPageToken,
  fetchHomeVideosAndChannels,
  setIsFetchingData,
  isFetchingData
}) => {

  const { width } = useWindowDimensions();

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
              duration={convertDuration(video.contentDetails.duration)}
              viewCount={convertViewCount(video.statistics.viewCount)}
              key={video.id}
            />
          );
        }
      });
    }
  };

  const renderSkeleton = () => {
    if(isFetchingData) {
      let videos = [];
      for(let i = 1; i <= 8; i++) {
        videos = [...videos, <VideoItem key={i} />];
      }
      return videos;
    }
  }

  const sideBarStatus = isBarClick && width >= 1024 ? 'collapse' : '';

  return (
    <div className={`list-videos ${sideBarStatus}`}>
      
      <div className="list-videos-wrapper">
        {renderHomeVideos()}
        {renderSkeleton()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isBarClick: state.isBarClick,
  homeVideos: Object.values(state.homeVideos),
  nextPageToken: state.homeVideos.nextPageToken,
  isFetchingData: state.isFetchingData,
});

const mapDispatchToProps = { fetchHomeVideosAndChannels, setIsFetchingData };

export default connect(mapStateToProps, mapDispatchToProps)(ListVideos);
