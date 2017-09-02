import commentsReducer from './commentsReducer';

export default (state = [], action) => {
    switch(action.type) {

        case 'SET_CAMPAIGNS': {
            return action.campaigns;
        };

        case 'ADD_CAMPAIGN': {
            return state.concat(action.campaign);
        };

        case 'REPLACE_CAMPAIGN': {
            const index = state.findIndex(campaign => campaign.id === action.campaign.id);
            
            return [
                ...state.slice(0, index),
                action.campaign,
                ...state.slice(index + 1)
            ];
        };

        case 'REMOVE_CAMPAIGN': {
            const index = state.findIndex(campaign => campaign.id === action.campaignId);
            
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        };

        // Add Cases For SET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT Here
        
        default: {
            return state;
        };
    };
};