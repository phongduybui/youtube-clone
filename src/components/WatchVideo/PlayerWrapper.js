import React from "react";
import { connect } from 'react-redux';
import ReactPlayer from "react-player/youtube";
import Skeleton from "react-loading-skeleton";

const PlayerWrapper = ({ id, isFetchingData }) => {
  return (
    <div className="player-wrapper">
      {isFetchingData 
        ? <Skeleton width="100%" height="100%" className="react-player"/>
        : <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${id}`}
          height="100%"
          width="100%"
          controls
        />
      }
    </div>
  );
};

const mapStateToProps = state => ({ isFetchingData: state.isFetchingData })

export default connect(mapStateToProps)(PlayerWrapper);
