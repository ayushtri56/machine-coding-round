import { useState } from "react";
import styles from "./styles.module.css";

export default function Comment({ commentData }) {
  return (
    <>
      {commentData.map((comment) => {
        return <CommentItem comment={comment} />;
      })}
    </>
  );
}

function CommentItem({ comment }) {
  const [showReply, toggleReply] = useState(false);
  const [showAddReply, toggleAddReply] = useState(false);
  const [commentData, setCommentData] = useState(comment);

  const onBlurInput = (e) => {
    const _commentData = { ...commentData };
    const commentVal = e.target.value;
    const commentObj = {
      id: "fsfs" + Math.random(),
      comment: commentVal,
      subComments: [],
    };

    if (_commentData.subComments.length) {
      _commentData.subComments.push(commentObj);
    } else {
      _commentData.subComments = [commentObj];
    }

    setCommentData(_commentData);
    toggleAddReply(prev => !prev)
    toggleReply(true);
  };

  return (
    <>
      <div className={styles.commentContainer}>
        <div className={styles.commentDetails}>
          <div>{commentData.comment}</div>
          <div className={styles.controls}>
            {commentData.subComments?.length > 0 && (
              <span onClick={() => toggleReply((prev) => !prev)}>
                {!showReply ? "View Reply" : "Hide Reply"}
              </span>
            )}
            <span onClick={() => toggleAddReply(!showAddReply)}>Add Reply</span>
          </div>
        </div>
        {showAddReply && (
          <input
            type="text"
            placeholder="Enter your comment"
            className={styles.commentBox}
            onBlur={onBlurInput}
          />
        )}
        {showReply && <Comment commentData={commentData.subComments} />}
      </div>
    </>
  );
}
