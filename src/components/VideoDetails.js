import './VideoDetails.css';
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Skeleton from 'react-loading-skeleton';
import Linkify from 'react-linkify';
import { getTime } from '../helpers/getTimeAgo';
import { viewNumber, countString } from '../helpers/convertViewCount';
import { VscCircleFilled } from 'react-icons/vsc';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';
import CommentList from './CommentList';

const VideoDetails = ({ id, video, channel }) => {

  const onBtnReactClick = (e) => {
    const target = e.currentTarget
    target.classList.toggle('selected');

    if(target.previousSibling) {
      target.previousSibling.classList.remove('selected')
    } else {
      target.nextSibling.classList.remove('selected');
    }

    for(let child of target.parentNode.childNodes) {
      if(child.classList.contains('selected')) {
        target.parentNode.classList.add('selected');
        return;
      } else {
        target.parentNode.classList.remove('selected');
      }
    }
  }

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
      <div className="video-details-wrapper">
        <p className="video__tags">
          {video ? video.snippet.tags?.slice(0, 3).map(tag => `#${tag} `) : null}
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
              <button 
                className="menu__btn reaction__like"
                onClick={onBtnReactClick}
              >
                <AiFillLike />
                <span>{video ? countString(video.statistics.likeCount) : null}</span>
              </button>
              <button 
                className="menu__btn reaction__dislike"
                onClick={onBtnReactClick}
              >
                <AiFillDislike />
                <span>
                  {video ? countString(video.statistics.dislikeCount) : null}
                </span>
              </button>
            </div>
            <button className="menu__btn menu__share">
              <RiShareForwardFill />
              <span>chia sẻ</span>
            </button>
            <button className="menu__btn menu__add">
              <MdPlaylistAdd />
              <span>lưu</span>
            </button>
          </div>
        </div>
      </div>
      <div className="channel-wrapper">
        <div className="channel-info">
          <div className="channel-info-wrapper">
            <img className="channel__thumbnail"
              src={channel ? channel.snippet.thumbnails.high.url : null} alt=" "/>
            <div className="channel__detail">
              <div className="channel__title">
                {channel ? channel.snippet.title : null}
              </div>
              <div className="channel__subscriber-count">
                {channel 
                ? countString(channel.statistics.subscriberCount) + ' người đăng ký' 
                : null}
              </div>
            </div>
          </div>
          <button className="btn-subscribe menu__btn">đăng ký</button>
        </div>
      </div>
      <div className="video-description">
        <div className="description-content desc-clamp">
          {video ? <Linkify> {video.snippet.description}</Linkify> : null}
        </div>
        <button 
          className="btn-toggle-description menu__btn"
          onClick={(e) => e.currentTarget.previousSibling.classList.toggle('desc-clamp')}
        >Hiển thị thêm / Ẩn bớt
        </button>
      </div>
      <CommentList videoId={video?.id} commentCount={video?.statistics.commentCount} />
    </div>
  )
}

export default VideoDetails
