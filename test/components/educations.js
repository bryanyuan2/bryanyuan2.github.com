var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compEducations = require("../../js/app/section/educations.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent educations section', function(){
  it('should be rendered', function () {
    var compEducationsSection = ReactTestUtils.renderIntoDocument(<compEducations />);
    expect(compEducationsSection).to.exist;
  });
});
