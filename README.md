# Iron Starter Part Two

## Objectives

* Add assocations for Comments and Campaigns
* Add A Comments form to the Campaigns Show Page
* Go over adding nested state (nested reducers) to a top level state object

## Introduction

In the last lesson we build out a CRUD app for Campaigns but we were missing the abilit to view, create and delete comments. In this lab we are going to be building out the additional components, reducers and actions needed to Create, Read and Delete a comment (feel free to add the ability to update, but that is not required for lab completion). 

## Note

This app will require a nested state of comments that lives inside of the campaigns state. The easiest way to handle updating this is to use a nested reducer, that is not part of combined reducers. An example would look like this for a Games reducer where a Game has many players. 

```javascript
const playersReducer = (state = [], action) => {
    switch(action.type) {

        case 'SET_PLAYERS':
            return action.players;

        case 'ADD_PLAYER':
            return state.concat(action.player);

        // etc... other action types
    };
};

const GamesReducer = (state = [], action) => {
    switch(action.type) {

        case 'SET_GAMES': {
            return action.games;
        };

        // etc... other action types

        // The Redux Dispatch Function will only hit this, so make sure to make to handle multiple action types in the GamesReducer
        case 'SET_PLAYERS':
        case 'ADD_PLAYER':
        case 'REPLACE_PLAYER':
        case 'REMOVE_PLAYER': {
            const index = state.findIndex(game => game.id === action.gameId);
            const game = state[index];
            const updatedGame = Object.assign({}, game, {
                players: playersReducer(game.players, action)
            });

            return [
                ...state.slice(0, index),
                updatedGame,
                ...state.slice(index + 1)
            ];
        };
        
        default: {
            return state;
        };
    };
};
``` 

This should give you an idea of how to set state for the comments in your application, and the tests will account for this pattern. Just remember to __NOT__ add the commentsReducer to `combineReducers()` in the `store.js` file. 

### App Design

We will not be adding any more Routes to this application. The design is rather simple: 

1. CampaignDetail renders a collection of __Comment__ components
    * The __Comment__ component is passed a `deleteComment(campaignId, commentId)` callback function that is invoked on clicking a delete button in the __Comment__ component.
2. CampaignDetail renders a __CreateCommentForm__
3. Create a `./src/actions/comments.js` file to add Action Creators & Async Actions. 
4. Create a `./src/reducers/commentsReducer.js` file to handle the various state changes of comments that belong to a Campaign. 
5. Update the `./src/reducers/campaignsReducer.js` to call the __commentsReducer__ when comments are being updated for a given campaign__. 

Those are the basic steps needed to get this app up and running. 

Please feel free to check out the example app video to see how it should function at [Iron Starter App Video](https://youtu.be/v5iyE9qFPmg)

### Setup

* API Server Instructions

```bash 
cd api 
bundle install
rails db:migrate 
rails server -p 3001 
``` 

We can also run `rspec `just to double check that all of our API tests are passing. If everything is good to go let's setup the Client server. 

* Client Server Setup

```
cd client 
npm install 
npm start
```

You can also run the test watch with `npm test`.

The Files are created already for this lab, but they still need to be coded.

### Summary

In this lab we learned how to add nested state and nested reducers to our Redux state and finish up v2 of our Iron Starter App. Congratulations on completing this application. This should give you a solid foundation to start building your final project. 

<p class='util--hide'>View <a href='https://learn.co/lessons/iron-starter-part-two-lab'>Iron Starter Part Two</a> on Learn.co and start learning to code for free.</p>