var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compCommunities = require("../../js/app/section/communities.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent communities section', function(){
  it('should be rendered', function () {
    var compCommunitiesSection = ReactTestUtils.renderIntoDocument(<compCommunities />);
    expect(compCommunitiesSection).to.exist;
  });
});
