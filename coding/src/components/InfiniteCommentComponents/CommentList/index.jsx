// src/components/CommentList.js
import React from 'react';
import Comment from '../Comment'
import styles from './CommentList.module.css';

const CommentList = ({ comments, onEdit, onDelete, onReply }) => {
  return (
    <div className={styles.commentList}>
      {comments.map(comment => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onReply={onReply} 
        />
      ))}
    </div>
  );
};

export default CommentList;
