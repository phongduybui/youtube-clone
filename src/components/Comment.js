import './Comment.css'
import React from 'react'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'

const Comment = ({
  textDisplay, 
  authorDisplayName, 
  authorProfileImageUrl, 
  authorChannelUrl, 
  likeCount, 
  publishedAt
}) => {
  return (
    <div className="comment">
      <a target="_blank" href={authorChannelUrl ? authorChannelUrl : 'abc'} rel="noreferrer">
        <img className="author__thumbnail" src={authorProfileImageUrl} alt="authorimg"/>
      </a>
      <div className="comment-info">
        <div>
          <a className="comment__author" href={authorChannelUrl} target="_blank" rel="noreferrer">
            {authorDisplayName}
          </a>
          <span className="comment__time">{publishedAt}</span>
        </div>
        <div className="comment__content" dangerouslySetInnerHTML={{__html: textDisplay}}>
        </div>
        <div className="cmt__reaction">
          <button className="menu__btn reaction__like">
            <AiFillLike />
            <span>{likeCount}</span>
          </button>
          <button className="menu__btn reaction__dislike">
            <AiFillDislike />
          </button>
          <button className="btn-toggle-description menu__btn">Phản hồi</button>
        </div>
      </div>
    </div>
  )
}

export default Comment
