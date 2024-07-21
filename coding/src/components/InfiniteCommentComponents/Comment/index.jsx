// src/components/Comment.js
import React, { useState } from 'react';
import CommentList from '../CommentList';
import styles from './Comment.module.css';

const Comment = ({ comment, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, text);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.comment}>
      {isEditing ? (
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <button className={styles.commentButton} onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button className={styles.commentButton} onClick={() => onDelete(comment.id)}>Delete</button>
      <button className={styles.commentButton} onClick={() => onReply(comment.id)}>Reply</button>
      {comment.replies && <CommentList comments={comment.replies} onEdit={onEdit} onDelete={onDelete} onReply={onReply} />}
    </div>
  );
};

export default Comment;
