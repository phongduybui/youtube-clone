/* eslint-disable react-hooks/exhaustive-deps */
import './WatchVideo.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBarClick, fetchVideoById } from '../actions';
import RelatedVideos from './RelatedVideos';
import VideoDetails from './VideoDetails';

const WatchVideo = (props) => {

  useEffect(() => {
    props.setBarClick(true);
    props.fetchVideoById(props.match.params.id)
  }, [])

  return (
    <div className="watch-video">
      <VideoDetails 
        id={props.match.params.id}
        video={props.video} 
        channel={props.channel} 
      />
      <RelatedVideos relatedVideos={props.relatedVideos} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const fromLocation = ownProps.location.state?.from;
  const videoId = ownProps.match.params.id;
  let channelId;
  let relatedVideos = Object.values(state.searchResults.videos);

  if(fromLocation === '/') {
    relatedVideos = Object.values(state.homeVideos);
    channelId = state.homeVideos[videoId]?.snippet.channelId;
  } else if(fromLocation === '/search-results') {
    channelId = state.searchResults.videos[videoId]?.snippet.channelId;
  }

  return {
    video: state.currentVideo 
      || state.homeVideos[videoId]
      || state.searchResults.videos[videoId],
    channel: state.homeChannels[state.currentVideo?.snippet.channelId]
      || state.homeChannels[channelId] 
      || state.searchResults.channels[channelId],
    relatedVideos
  }
  
};

const mapDispatchToProps = { setBarClick, fetchVideoById };

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo)
