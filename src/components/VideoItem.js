import "./VideoItem.css";
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { VscCircleFilled } from "react-icons/vsc";
import { AiFillClockCircle } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import getTimeAgo from '../helpers/getTimeAgo';

const VideoItem = ({
  channelId,
  channel,
  viewCount,
  duration,
  snippet,
}) => {
  const { title, channelTitle, thumbnails, publishedAt } = snippet;

  return (
    <div className="video-item">
      <div className="video-item__thumbnail">
        <img
          className="video-item__thumbnail-img"
          src={thumbnails.maxres.url}
          alt={title}
        />
        <span className="video-item__thumbnail-duration">{duration}</span>
        <span className="video-item__thumbnail-item" data-text="xem sau">
          <AiFillClockCircle />
        </span>
        <span
          className="video-item__thumbnail-item"
          data-text="thêm vào danh sách chờ"
        >
          <RiPlayList2Fill />
        </span>
      </div>
      <div className="video-item__details">
        <Link to="" className="video-item__details-avatar">
          <img
            src={channel ? channel.snippet.thumbnails.high.url : ''}
            alt={channel ? channel.snippet.title : ''}
          />
        </Link>
        <div className="video-item__details-meta">
          <h3 className="video-item__details-meta__title">
            <Link className="video-item__details__title-link text-clamp">
              {title}
            </Link>
          </h3>
          <div className="video-item__details-meta__channel text-clamp text-clamp--1">
            {channelTitle}
          </div>
          <div className="video-item__details-meta__statistic">
            <span className="statistic__view-count">{viewCount}</span>
            <VscCircleFilled />
            <span className="statistic__post-time">{getTimeAgo(publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.homeChannels[ownProps.channelId]
  }
}

export default connect(mapStateToProps)(VideoItem);
