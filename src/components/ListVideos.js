import "./ListVideos.css";
import React from "react";
import { connect } from 'react-redux';
import VideoItem from "./VideoItem";

class ListVideos extends React.Component {
  render() {
    return (
      <div className={`list-videos ${this.props.barsCollapse ? 'bars-collapse' : ''}`}>
        <div className="list-videos-wrapper">
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
        </div>
      </div>
    )
  }
  
};

const mapStateToProps = state => ({ barsCollapse: state.isBarsClick });

export default connect(mapStateToProps)(ListVideos);
