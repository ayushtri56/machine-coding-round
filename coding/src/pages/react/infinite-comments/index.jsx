import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from '/src/components/InfiniteCommentComponents/CommentForm/index'
import CommentList from '/src/components/InfiniteCommentComponents/CommentList'

const App = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (text) => {
    setComments([...comments, { id: uuidv4(), text, replies: [] }]);
  };

  const handleEditComment = (id, newText) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, text: newText } : comment
    ));
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleReplyComment = (id, replyText) => {
    const addReply = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, replies: [...comment.replies, { id: uuidv4(), text: replyText, replies: [] }] };
        } else if (comment.replies) {
          return { ...comment, replies: addReply(comment.replies) };
        } else {
          return comment;
        }
      });
    };
    setComments(addReply(comments));
  };

  return (
    <div className="App">
      <h1>Infinite Comments</h1>
      <CommentForm onAdd={handleAddComment} />
      <CommentList 
        comments={comments} 
        onEdit={handleEditComment} 
        onDelete={handleDeleteComment} 
        onReply={handleReplyComment} 
      />
    </div>
  );
};

export default App;
