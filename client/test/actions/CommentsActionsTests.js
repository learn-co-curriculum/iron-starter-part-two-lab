import { expect } from 'chai';
import uuid from 'uuid';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import 'isomorphic-fetch';
import { setComments, addComment, removeComment, fetchComments, createComment, deleteComment } from '../../src/actions/comments';

describe('Comments Actions', () => {
    describe('Action Creators', () => {
        let comment;
        let comments;
    
        before(() => {
            comment = {
                id: uuid(),
                content: 'Test Content',
                campaign: { id: uuid() }
            };
            comments = [
                { id: uuid(), content: 'First Comment', campaign: { id: uuid() } },
                { id: uuid(), content: 'Second Comment', campaign: { id: uuid() } }
            ];
        })
    
        describe('setComments', () => {
            it("should return an Object with SET_COMMENTS' type, a Comments Array & camapaign_id", () => {
                expect(setComments(comments)).to.deep.equal({
                    type: 'SET_COMMENTS', 
                    comments,
                    campaignId: comments[0].campaign.id
                });
            });
        });
    
        describe('addComment', () => {
            it("should return an Object with ADD_COMMENT type and a Comment Object", () => {
                expect(addComment(comment)).to.deep.equal({
                    type: 'ADD_COMMENT', 
                    comment,
                    campaignId: comment.campaign.id
                });
            });
        });
    
        describe('removeComment', () => {
            it("should return an Object with REMOVE_COMMENT type and a commendId", () => {
                const { id, campaign } = comments[0];
                expect(removeComment(id, campaign.id)).to.deep.equal({
                    type: 'REMOVE_COMMENT', 
                    commentId: id, 
                    campaignId: campaign.id
                });
            });
        });
    });
    
    describe('Async Actions', () => {
        const campaignId = uuid();
        const campaign = {
            id: campaignId,
            title: 'Test Title', 
            description: 'Test Description',
            goal: 450000,
            pledged: 45,
            deadline: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            comments: [
                { id: uuid(), content: 'First Comment', created_at: "2017-08-28T20:33:07.449Z", updated_at: "2017-08-28T20:33:07.449Z", campaign: { id: campaignId } },
                { id: uuid(), content: 'Second Comment', created_at: "2017-08-28T20:33:07.449Z", updated_at: "2017-08-28T20:33:07.449Z", campaign: { id: campaignId } }
            ]
        }
        const comments = campaign.comments;
        const comment = comments[0];
        const initialState = {
            campaigns: [
                campaign
            ]
        };
        const url = 'http://localhost:3001/api';
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const requiredActionCreators = [
            { type: 'MAKING_API_REQUEST' },
            { type: 'SUCCESSFUL_API_REQUEST' }
        ];
        let store;
        
        beforeEach(() => {
            store = mockStore(initialState)
        });
    
        afterEach(() => nock.cleanAll());
    
        describe('fetchComments', () => {
            it('dispatches MAKING_API_REQUEST, SUCCESSFUL_API_REQUEST & SET_COMMENTS types', () => {
                nock(url)
                    .get(`/campaigns/${campaign.id}/comments`)
                    .reply(200, comments);
    
                return store.dispatch(fetchComments(campaign.id))
                    .then(() => expect(store.getActions()).to.deep.equal([
                        ...requiredActionCreators,
                        { type: 'SET_COMMENTS', comments, campaignId: comments[0].campaign.id }
                    ]));
            });
        });
    
        describe('createComment', () => {
            it('dispatches MAKING_API_REQUEST, SUCCESSFUL_API_REQUEST & ADD_COMMENT types', () => {
                const newComment = { content: 'Test Comment' };
    
                nock(url)
                    .post(`/campaigns/${campaign.id}/comments`)
                    .reply(201, comment);
    
                return store.dispatch(createComment(campaign.id, newComment))
                    .then(() => expect(store.getActions()).to.deep.equal([
                        ...requiredActionCreators,
                        { type: 'ADD_COMMENT', comment, campaignId: comment.campaign.id }
                    ]));
            });
        });
    
        describe('deleteComment', () => {
            it('dispatches MAKING_API_REQUEST, SUCCESSFUL_API_REQUEST & REMOVE_COMMENT types', () => {
                nock(url)
                    .delete(`/campaigns/${campaign.id}/comments/${comment.id}`)
                    .reply(204);
    
                return store.dispatch(deleteComment(campaign.id, comment.id))
                    .then(() => expect(store.getActions()).to.deep.equal([
                        ...requiredActionCreators,
                        { type: 'REMOVE_COMMENT', commentId: comment.id, campaignId: comment.campaign.id }
                    ]));
            });
        });
    });
});

