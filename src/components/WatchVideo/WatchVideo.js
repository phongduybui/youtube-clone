/* eslint-disable react-hooks/exhaustive-deps */
import './WatchVideo.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBarClick, fetchVideoById, setIsFetchingData } from '../../actions';
import RelatedVideos from './RelatedVideos';
import VideoDetails from './VideoDetails';

const WatchVideo = (props) => {

  useEffect(() => {
    props.setBarClick(true);
    props.setIsFetchingData(true);
    props.fetchVideoById(props.match.params.id)
  }, [props.match.params.id])

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

const mapStateToProps = (state) => ({
  video: state.currentVideo,
  channel: state.homeChannels[state.currentVideo?.snippet.channelId],
  relatedVideos: Object.values(state.searchResults.videos)
});

const mapDispatchToProps = { setBarClick, fetchVideoById, setIsFetchingData };

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo)
