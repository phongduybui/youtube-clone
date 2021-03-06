import "./VideoItem.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../history";
import { VscCircleFilled } from "react-icons/vsc";
import { AiFillClockCircle } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { getTimeAgo } from "../helpers/getTimeAgo";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactPlayer from 'react-player/youtube';

const VideoItem = ({
  className,
  id,
  channelId,
  channel,
  viewCount,
  duration,
  title,
  channelTitle,
  thumbnails,
  description,
  publishedAt,
  isDarkMode,
}) => {

  const [isLoaded, setIsLoaded] = useState('');
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const darkSkeleton = 
    isDarkMode ? { color: "#202020", highlightColor: "#444" } : null;

  const handleVideoMouseLeave = () => {
    setIsPreviewShown(false); 
    setIsLoaded('');
  }

  return (
    <div className={`video-item ${className ? className : ''}`} 
      onMouseEnter={() => setIsPreviewShown(true)}
      onMouseLeave={handleVideoMouseLeave}
      onClick={() => history.push(`/watch/${id}`)}
    >
      <div className="video-item__thumbnail">
        {thumbnails && title ? (
          <React.Fragment>
            <div className="video-item__thumbnail-preview">
              {isPreviewShown 
              ? 
              <div className="iframe-container">
                <div className={`ui inverted large loader ${isLoaded ? '': 'active'}`}>
                </div>
                <img
                  className={`video-item__thumbnail-img iframe__loader ${isLoaded}`}
                  src={thumbnails.high?.url || thumbnails.medium?.url}
                  alt={title}
                />
                <ReactPlayer
                  height="100%"
                  width="100%"
                  onReady={()=>setTimeout(() => setIsLoaded('is-loaded'), 1500)}
                  url={`https://www.youtube.com/watch?v=${id}`}
                  playing
                  muted
                />
              </div>
              : <img
                className="video-item__thumbnail-img"
                src={thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url}
                alt={title}
              />
              }
            </div>
            <span className="video-item__thumbnail-duration">{duration}</span>
            <span className="video-item__thumbnail-item" data-text="xem sau">
              <AiFillClockCircle />
            </span>
            <span
              className="video-item__thumbnail-item"
              data-text="th??m v??o danh s??ch ch???"
            >
              <RiPlayList2Fill />
            </span>
          </React.Fragment>
        ) : (
          <SkeletonTheme {...darkSkeleton} >
            <Skeleton height="145px" />
          </SkeletonTheme>
        )}
      </div>
      <div className="video-item__details">
        <Link to="/" className="video-item__details-avatar">
          {channel ? (
            <img
              src={channel.snippet.thumbnails.high.url}
              alt={channel.snippet.title}
            />
          ) : (
            <SkeletonTheme {...darkSkeleton} >
              <Skeleton circle width="35px" height="35px" />
            </SkeletonTheme>
          )}
        </Link>
        <div className="video-item__details-meta">
          <h3 className="video-item__details-meta__title">
            <Link to="/" className="video-item__details__title-link text-clamp">
              {title  
              ? title 
              : <SkeletonTheme {...darkSkeleton} >
                  <Skeleton />
              </SkeletonTheme>}
            </Link>
          </h3>
          <div className="video-item__details-meta__channel text-clamp text-clamp--1">
            {channelTitle 
            ? channelTitle 
            : <SkeletonTheme {...darkSkeleton} >
                <Skeleton width="50%" />
              </SkeletonTheme>}
          </div>
          {viewCount && publishedAt ? (
            <div className="video-item__details-meta__statistic">
              <span className="statistic__view-count">{viewCount}</span>
              <VscCircleFilled />
              <span className="statistic__post-time">
                {getTimeAgo(publishedAt)}
              </span>
            </div>
          ) : null
          }
          {description  
          ? <div className="video-item__description text-clamp">{description}</div>
          : null
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.homeChannels[ownProps.channelId] 
    || state.searchResults.channels[ownProps.channelId],
    isDarkMode: state.isDarkMode,
  };
};

export default connect(mapStateToProps)(VideoItem);
