// @ Action Creators 
export const setCampaigns = campaigns => {
    return {
        type: 'SET_CAMPAIGNS',
        campaigns
    };
};

export const addCampaign = campaign => {
    return {
        type: 'ADD_CAMPAIGN',
        campaign
    };
};

export const replaceCampaign = campaign => {
    return {
        type: 'REPLACE_CAMPAIGN',
        campaign
    };
};

export const removeCampaign = campaignId => {
    return {
        type: 'REMOVE_CAMPAIGN',
        campaignId
    };
};

// @ Async Actions
const API_URL = 'http://localhost:3001/api';

export const fetchCampaigns = () => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns`)
            .then(response => response.json())
            .then(campaigns => {
                dispatch(setCampaigns(campaigns));
            })
            .catch(err => console.log(err));
    };
};

export const createCampaign = (campaign, routerHistory) => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                campaign
            })
        })
            .then(response => response.json())
            .then(campaign => {
                dispatch(addCampaign(campaign));
                routerHistory.replace('/');
            })
            .catch(err => console.log(err));
    };
};

export const updateCampaign = (campaign, routerHistory) => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns/${campaign.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                campaign
            })
        })
        .then(response => response.json())
        .then(campaign => {
            dispatch(replaceCampaign(campaign));
            routerHistory.replace(`/campaigns/${campaign.id}`);
        })
        .catch(err => console.log(err));
    };
};

export const deleteCampaign = (campaignId, routerHistory) => {
    return dispatch => {
        return fetch(`${API_URL}/campaigns/${campaignId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                dispatch(removeCampaign(campaignId));
                routerHistory.replace(`/campaigns`);
            }
        })
        .catch(err => console.log(err));
    };
};

