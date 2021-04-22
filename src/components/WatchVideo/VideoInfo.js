import React from 'react';
import { getTime } from '../../helpers/getTimeAgo';
import { viewNumber, countString } from '../../helpers/convertViewCount';
import { VscCircleFilled } from 'react-icons/vsc';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';

const VideoInfo = ({ video }) => {

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
    <div className="video-details-wrapper">
      <p className="video__tags">
        {video ? video.snippet.tags?.slice(0, 3).map(tag => `#${tag} `) : null}
      </p>
      <h2 className="video__title">
        {video ? video.snippet.title : <Skeleton width="60%" height="20px"/>}
      </h2>
      {video
        ? <div className="video__info">
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
        : <Skeleton width="80%" height="20px" />
      }
    </div>
  )
}

export default VideoInfo
