import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { CreateCommentForm } from '../../src/containers/CreateCommentForm';

describe('CreateCommentForm Component', () => {
    let createComment;
    let preventDefault;
    let wrapper;
    chai.use(spies);

    beforeEach(() => {
        createComment = chai.spy(function() {});
        preventDefault = chai.spy(function() {});
        wrapper = shallow(<CreateCommentForm createComment={createComment} campaignId={1} />);
    });

    afterEach(() => {
        createComment.reset();
        preventDefault.reset();
    });

    it('has a default state', () => {
        expect(wrapper.state()).to.deep.equal({
            content: ''
        });
    });

    it('always renders a form tag', () => {
        const form = wrapper.find('form');

        expect(form.length).to.equal(1, 'CreateCommentForm must contain a form tag');
    });

    it('always renders a textarea[name="content"] tag for comment content', () => {
        const input = wrapper.find('textarea[name="content"]');

        expect(input.length).to.equal(1, 'CreateCommentForm must contain one textarea[name="content"] tag');
    });

    it('should pass a new value to state using the handleOnChange function', () => {
        wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})

        expect(wrapper.state()).to.deep.equal({
            content: 'test content', 
        });
    });

    it('should handleOnSubmit and preventDefault()', () => {
        wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})
        wrapper.find('form').simulate('submit', { preventDefault });

        expect(preventDefault).to.have.been.called.once;
    });

    it('should reset state after form handleOnSubmit', () => {
        wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})
        
        expect(wrapper.state()).to.deep.equal({
            content: 'test content', 
        });

        wrapper.find('form').simulate('submit', { preventDefault });

        expect(wrapper.state()).to.deep.equal({ 
            content: '',
        });  
    });

    it('should call addQuote prop on handleOnSubmit', () => {
        wrapper.find('form').simulate('submit', { preventDefault });
        
        expect(createComment, "Expected this.props.createComment to have been called").to.have.been.called.once;
    });
});