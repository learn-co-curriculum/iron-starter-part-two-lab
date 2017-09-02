import React, { Component } from 'react';

export class CreateCommentForm extends Component { // <- !!important that this exported as is for tests to work!!

    render() {
        return (
            <div>{/* code */}</div>
        );
    }
};

// Make sure to export default with connect();