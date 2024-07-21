// src/components/CommentForm.js
import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Add a comment" 
      />
      <button className={styles.commentButton} type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
