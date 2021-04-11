import "./ListVideos.css";
import React from "react";
import { connect } from "react-redux";
import { fetchHomeVideosAndChannels } from "../actions";
import convertDuration from "../helpers/convertDuration";
import convertViewCount from "../helpers/convertViewCount";
import VideoItem from "./VideoItem";

class ListVideos extends React.Component {
  componentDidMount() {
    this.props.fetchHomeVideosAndChannels();
  }

  renderHomeVideos = () => {
    if (this.props.homeVideos) {
      return this.props.homeVideos.map((video) => {
        if(typeof video === 'object') {
          return (
            <VideoItem
              channelId={video.snippet.channelId}
              duration={convertDuration(video.contentDetails.duration)}
              snippet={video.snippet}
              viewCount={convertViewCount(video.statistics.viewCount)}
              key={video.id}
            />
          );
        }
      });
    }
    return "Loading...";
  };

  render() {
    const barStatus = this.props.barsCollapse ? "bars-collapsed" : "";
    return (
      <div className={`list-videos ${barStatus}`}>
        <div className="list-videos-wrapper">{this.renderHomeVideos()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  barsCollapse: state.isBarsClick,
  homeVideos: Object.values(state.homeVideos),
});

const mapDispatchToProps = { fetchHomeVideosAndChannels };

export default connect(mapStateToProps, mapDispatchToProps)(ListVideos);
