import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import React from 'react';
import Comment from '../../src/components/Comment';
chai.use(spies);

describe('Comment', () => {
  let wrapper;
  let deleteComment;
  
  beforeEach(() => {
    deleteComment = chai.spy(function() {});
    wrapper = shallow(<Comment campaignId={1} comment={{ content: 'test comment' }} deleteComment={deleteComment} />);
  });

  afterEach(() => {
      deleteComment.reset();
  });

  it('renders the content of the comment', () => {
    const p = wrapper.find('p');
    expect(p.length).to.eq(1, "The Comment component is not rendering the paragraph tag");
    expect(p.text()).to.eq('test comment', 'The Comment component is not rendering the correct text in the p tag');
  });

  it('should call deleteComment prop as onClick event when delete button is clicked', () => {
    wrapper.find('button').simulate('click', { button: 0 });
    expect(deleteComment).to.have.been.called.once;
  });
});