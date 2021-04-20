import './CommentList.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../actions'
import { countComment } from '../helpers/convertViewCount';
import { getTimeAgo } from '../helpers/getTimeAgo';
import PostComment from './PostComment'
import Comment from './Comment'
import { MdSort } from 'react-icons/md'

const CommentList = ({ videoId, commentCount, comments, fetchComments }) => {

  useEffect(() => {
    if(videoId) {
      fetchComments(videoId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  function renderComments() {
    return comments.map(comment => {
      const { 
        textDisplay, 
        authorDisplayName, 
        authorProfileImageUrl, 
        authorChannelUrl, 
        likeCount, 
        publishedAt 
      } = comment.snippet.topLevelComment.snippet;
      return (
        <Comment 
          textDisplay={textDisplay}
          authorDisplayName={authorDisplayName}
          authorProfileImageUrl={authorProfileImageUrl}
          authorChannelUrl={authorChannelUrl}
          likeCount={likeCount}
          publishedAt={getTimeAgo(publishedAt)}
        />
      );
    })
  }

  return (
    <div className="comment-list">
      <div className="comment-list-info">
        <div className="comment-count">{`${countComment(commentCount)} bình luận`}</div>
        <div className="comment-sort">
          <MdSort />
          <span className="btn-toggle-description menu__btn">Sắp xếp theo</span>
        </div>
      </div>
      <PostComment />
      {renderComments()}
    </div>
  )
}

const mapStateToProps = state => ({ comments: Object.values(state.comments) });

export default connect(mapStateToProps, { fetchComments })(CommentList)
