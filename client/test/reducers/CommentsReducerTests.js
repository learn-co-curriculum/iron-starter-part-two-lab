import { expect } from 'chai';
import uuid from 'uuid';
import reducer from '../../src/reducers/commentsReducer';

describe('Comments Reducer', () => {

    let campaignId;
    let campaign;
    let comments;
    let comment;

    beforeEach(() => {
        campaignId = uuid();
        campaign = {
            id: campaignId,
            title: 'Test Title', 
            description: 'Test Description',
            goal: 450000,
            pledged: 45,
            deadline: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            comments: [
                { id: uuid(), content: 'First Comment', created_at: "2017-08-28T20:33:07.449Z", updated_at: "2017-08-28T20:33:07.449Z", campaign_id: campaignId },
                { id: uuid(), content: 'Second Comment', created_at: "2017-08-28T20:33:07.449Z", updated_at: "2017-08-28T20:33:07.449Z", campaign_id: campaignId }
            ]
        }
        comments = campaign.comments;
        comment = Object.assign({}, comments[0], { content: 'Test Comment' });
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should handle SET_COMMENTS', () => {
        expect(reducer(undefined, {
            type: 'SET_COMMENTS',
            comments,
            campaignId
        })).to.deep.equal(comments);
    });

    it('should handle ADD_COMMENT', () => {
        expect(reducer(comments, {
            type: 'ADD_COMMENT', 
            comment,
            campaignId,
        })).to.deep.equal(comments.concat(comment));
    });

    it('should handle REMOVE_COMMENT', () => {
        const index = comments.findIndex(commentItem => commentItem.id === comment.id);

        expect(reducer(comments, {
            type: 'REMOVE_COMMENT',
            commentId: comment.id,
            campaignId
        })).to.deep.equal(
            [
                ...comments.slice(0, index),
                ...comments.slice(index + 1)
            ]
        );
    });
});