import "./VideoItem.css";
import React from "react";
import { Link } from "react-router-dom";

const VideoItem = () => {
  return (
    <div className="video-item">
      <div className="video-item__thumbnail">
        <img className="video-item__thumbnail-img" src="https://i.ytimg.com/vi/buEYoo-l82U/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiMQIMPKLZK16cJskW3A3lVWgxPQ" alt=""/>
      </div>
      <div className="video-item__details">
        <Link to="" className="video-item__details-avatar">
          <img src="https://yt3.ggpht.com/ytc/AAUvwniy1T-0_bVHKkU0XSRih0zyQpTtaDwfz1ucJSY3=s68-c-k-c0x00ffffff-no-rj" alt=""/>
        </Link>
        <div className="video-item__details-meta">
          <h3 className="video-item__details-meta__title">
            <Link className="video-item__details__title-link">
              Có Khi Nào Rời Xa | Bích Phương | Bun & Orin Cover
            </Link>
          </h3>
          <div className="video-item__details-meta__channel">
            Bun & Orin
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
