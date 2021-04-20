import './VideoDetails.css';
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Skeleton from 'react-loading-skeleton';
import { getTime } from '../helpers/getTimeAgo';
import { viewNumber } from '../helpers/convertViewCount';
import { VscCircleFilled } from 'react-icons/vsc';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';

const VideoDetails = ({ id, video, channel }) => {

  return (
    <div className="video-details">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player" 
          url={`https://www.youtube.com/watch?v=${id}`} 
          height="100%"
          width="100%"
          controls
        />
      </div>
      <div className="video-details__info">
        <p className="video__tags">
          {video ? video.snippet.tags.slice(0, 3).map(tag => `#${tag} `) : null}
        </p>
        <h2 className="video__title">
          {video ? video.snippet.title : <Skeleton width="60%" height="20px"/>}
        </h2>
        <div className="video__info">
          <div className="info-text">
            <div className="info-text__view-count">
              {video ? viewNumber(video.statistics.viewCount) : null}
            </div>
            <VscCircleFilled />
            <div className="info-text__published-at">
              {video ? getTime(video.snippet.publishedAt) : null}
            </div>
          </div>
          <div className="info-menu">
            <div className="menu__reaction">
              <div className="menu__btn reaction__like">
                <AiFillLike />
                <span>113 N</span>
              </div>
              <div className="menu__btn reaction__dislike">
                <AiFillDislike />
                <span>7.3 N</span>
              </div>
            </div>
            <div className="menu__btn menu__share">
              <RiShareForwardFill />
              <span>chia sẻ</span>
            </div>
            <div className="menu__btn menu__add">
              <MdPlaylistAdd />
              <span>lưu</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default VideoDetails
