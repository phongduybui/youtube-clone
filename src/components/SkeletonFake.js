import React from 'react'
import { connect } from 'react-redux';
import VideoItem from './VideoItem';

const SkeletonFake = ({isFetchingData}) => {
  
  const renderSkeleton = () => {
    if(isFetchingData) {
      let videos = [];
      for(let i = 1; i <= 8; i++) {
        videos = [...videos, <VideoItem key={i} />];
      }
      return videos;
    }
  }

  return (
    <React.Fragment>
      {renderSkeleton()}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({ isFetchingData: state.isFetchingData });

export default connect(mapStateToProps)(SkeletonFake)
