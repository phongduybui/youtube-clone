import './PostComment.css'
import React, { useState } from 'react'

const PostComment = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="post-comment">
      <a href="/" target="_blank">
        <img className="author__thumbnail" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU" alt=""/>
      </a>
      <form className="post-comment__form">
        <input
          type="text"
          className="post-comment__input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bình luận công khai..."
        />
        <div className="border-expand"></div>
        <div className="post-comment__btn">
          <button 
            className="menu__btn btn-cancel"
            onClick={(e) => e.preventDefault()}
          >Hủy
          </button>
          <button 
            className={`menu__btn btn-post-cmt ${comment && 'enabled'}`} 
            disabled={comment ? false : true}
            onClick={(e) => e.preventDefault()}
          >Bình luận
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostComment
