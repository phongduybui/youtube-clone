import "./VideoItem.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { VscCircleFilled } from "react-icons/vsc";
import { AiFillClockCircle } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import getTimeAgo from "../helpers/getTimeAgo";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const VideoItem = ({
  id,
  channelId,
  channel,
  viewCount,
  duration,
  title,
  channelTitle,
  thumbnails,
  publishedAt,
  isDarkMode,
}) => {
  
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const darkSkeleton = isDarkMode ? { color: "#202020", highlightColor: "#444" } : null;

  return (
    <div className="video-item" 
      onMouseEnter={() => setIsPreviewShown(true)}
      onMouseLeave={() => setIsPreviewShown(false)}
    >
      <div className="video-item__thumbnail">
        {thumbnails && title ? (
          <React.Fragment>
            <div className="video-item__thumbnail-preview">
              {isPreviewShown 
              ? <iframe 
                width="100%" 
                height="100%"
                className="video-item__thumbnail-img"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&modestbranding=1&controls=0`}
                title="yt" 
                frameBorder="0" 
                allow="autoplay"
              ></iframe>
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
              data-text="thêm vào danh sách chờ"
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
          ) : (
            <Skeleton width="0" />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.homeChannels[ownProps.channelId],
    isDarkMode: state.isDarkMode,
  };
};

export default connect(mapStateToProps)(VideoItem);
