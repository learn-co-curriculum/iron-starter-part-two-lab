import React from 'react';

const Comment = ({ campaignId, comment, deleteComment }) => {
    return (
        <div>
            <p>{comment.content}</p>
            <button onClick={() => deleteComment(campaignId, comment.id)}>Delete</button>
        </div>
    );
};

export default Comment;