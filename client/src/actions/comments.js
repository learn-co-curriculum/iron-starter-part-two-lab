// @ Action Creators

export const setComments = comments => {
    return {
        type: 'SET_COMMENTS',
        comments,
        campaignId: comments[0].campaign.id
    };
};

export const addComment = comment => {
    return { 
        type: 'ADD_COMMENT', 
        comment,
        campaignId: comment.campaign.id
    };
};

export const removeComment = (commentId, campaignId) => {
    return {
        type: 'REMOVE_COMMENT', 
        commentId,
        campaignId
    };
};

// @ Async Actions 
const API_URL = 'http://localhost:3001/api';

export const fetchComments = campaignId => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns/${campaignId}/comments`)
            .then(response => response.json())
            .then(comments => {
                dispatch(setComments(comments));
            })
            .catch(err => console.log(err));
    };
};

export const createComment = (campaignId, newComment) => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns/${campaignId}/comments`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                comment: newComment
            })
        })
        .then(response => response.json())
        .then(comment => {
            dispatch(addComment(comment));
        })
        .catch(err => console.log(err));
    };
};

export const deleteComment = (campaignId, commentId) => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns/${campaignId}/comments/${commentId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                dispatch(removeComment(commentId, campaignId));
            }
        })
        .catch(err => unsuccessfulAPIRequest());
    };
};
