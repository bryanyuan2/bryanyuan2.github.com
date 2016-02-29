var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compWorks = require("../../js/app/section/works.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent works section', function(){
  it('should be rendered', function () {
    var compWorksSection = ReactTestUtils.renderIntoDocument(<compWorks />);
    expect(compWorksSection).to.exist;
  });
});
