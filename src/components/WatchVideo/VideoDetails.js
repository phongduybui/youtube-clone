import './VideoDetails.css';
import React from 'react';
import Linkify from 'react-linkify';
import CommentList from './CommentList';
import PlayerWrapper from './PlayerWrapper';
import VideoInfo from './VideoInfo';
import Channel from './Channel';

const VideoDetails = ({ id, video, channel }) => {

  return (
    <div className="video-details">
      <PlayerWrapper id={id} />
      <VideoInfo video={video} />
      <Channel channel={channel} />
      <div className="video-description">
        <div className="description-content desc-clamp">
          {video ? <Linkify> {video.snippet.description} </Linkify> : null}
        </div>
        <button 
          className="btn-toggle menu__btn"
          onClick={(e) => e.currentTarget.previousSibling.classList.toggle('desc-clamp')}
        >Hiển thị thêm / Ẩn bớt
        </button>
      </div>
      <CommentList videoId={video?.id} commentCount={video?.statistics.commentCount} />
    </div>
  )
}

export default VideoDetails
