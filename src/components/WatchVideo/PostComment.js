import './PostComment.css';
import React, { useState } from 'react';
import { fetchMyComment } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../firebase/firestore';
import { googleSignInPopup } from '../../firebase/googleAuth';

const PostComment = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { user, videoId } = useSelector(state => ({ 
    user: state.user,
    videoId: state.currentVideo?.id
  }));

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(user) {
      addComment({
        uid: user.uid,
        id: '_' + Math.random().toString(36).substr(2, 9),
        snippet: {
          videoId: videoId,
          topLevelComment: {
              snippet: {
                  textDisplay: comment,
                  authorDisplayName: user.displayName,
                  authorProfileImageUrl: user.photoURL,
                  authorChannelUrl: "/",
                  likeCount: 0,
                  publishedAt: new Date().toISOString()
              }
          }
        }
      })
      .then(() => {
        dispatch(fetchMyComment(user.uid, videoId));
        setComment('');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    } else {
      googleSignInPopup();
    }
  }

  const onBtnCancelClick = (e) => {
    e.preventDefault();
    setComment('');
  }

  return (
    <div className="post-comment">
      <a href="/" target="_blank">
        <img className="author__thumbnail" src={user?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt=""/>
      </a>
      <form onSubmit={onFormSubmit} className="post-comment__form">
        <input
          type="text"
          className="post-comment__input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bình luận công khai..."
        />
        <div className="border-expand"></div>
        <div className="post-comment__btn hide">
          <button 
            className="menu__btn btn-cancel"
            onClick={onBtnCancelClick}
          >Hủy
          </button>
          <button 
            className={`menu__btn btn-post-cmt ${comment && 'enabled'}`} 
            disabled={comment ? false : true}
          >Bình luận
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostComment;
