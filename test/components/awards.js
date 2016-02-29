var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compAwards = require("../../js/app/section/awards.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent awards section', function(){
  it('should be rendered', function () {
    var compAwardsSection = ReactTestUtils.renderIntoDocument(<compAwards />);
    expect(compAwardsSection).to.exist;
  });
});
