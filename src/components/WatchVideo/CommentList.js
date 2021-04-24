import "./CommentList.css";
import React, { useEffect } from "react";
import { setIsFetchingData } from "../../actions";
import { connect } from "react-redux";
import { fetchComments, fetchMyComment, clearComments } from "../../actions";
import { countComment } from "../../helpers/convertViewCount";
import { getTimeAgo } from "../../helpers/getTimeAgo";
import PostComment from "./PostComment";
import Comment from "./Comment";
import { MdSort } from "react-icons/md";

const CommentList = ({
  videoId,
  commentCount,
  comments,
  uid,
  nextPageComment,
  fetchMyComment,
  fetchComments,
  clearComments,
  setIsFetchingData,
}) => {
  useEffect(() => {
    if (videoId) {
      setIsFetchingData(true);
      clearComments();
      if(uid) {
        fetchMyComment(uid, videoId);
      }
      fetchComments(videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, uid]);

  function renderComments() {
    return comments.map((comment) => {
      if(typeof comment === 'object') {
        const {
          textDisplay,
          authorDisplayName,
          authorProfileImageUrl,
          authorChannelUrl,
          likeCount,
          publishedAt,
        } = comment.snippet.topLevelComment.snippet;
        return (
          <Comment
            textDisplay={textDisplay}
            authorDisplayName={authorDisplayName}
            authorProfileImageUrl={authorProfileImageUrl}
            authorChannelUrl={authorChannelUrl}
            likeCount={likeCount}
            publishedAt={getTimeAgo(publishedAt)}
            key={comment.id}
          />
        );
      }
      return null;
    });
  }

  return (
    <div className="comment-list">
      <div className="comment-list-info">
        <div className="comment-count">{`${countComment(
          commentCount
        )} bình luận`}</div>
        <div className="comment-sort">
          <MdSort />
          <span className="btn-toggle menu__btn">Sắp xếp theo</span>
        </div>
      </div>
      <PostComment />
      {renderComments()}
      <button 
        className="btn-toggle menu__btn btn-show-more"
        onClick={() => fetchComments(videoId, nextPageComment)}
      >Hiển thị thêm
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: Object.values(state.comments),
  nextPageComment: state.comments.nextPageToken,
  uid: state.user?.uid,
});

const mapDispatchToProps = {
  fetchComments,
  setIsFetchingData,
  clearComments,
  fetchMyComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
