export default (state = [], action) => {
    switch(action.type) {

        case 'SET_COMMENTS':
            return action.comments;

        case 'ADD_COMMENT':
            return state.concat(action.comment);

        case 'REMOVE_COMMENT': {
            const index = state.findIndex(comment => comment.id === action.commentId);

            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        };

        default:
            return state;
    };
};