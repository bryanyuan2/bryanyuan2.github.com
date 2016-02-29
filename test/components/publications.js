var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compPublications = require("../../js/app/section/publications.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent publications section', function(){
  it('should be rendered', function () {
    var compPublicationsSection = ReactTestUtils.renderIntoDocument(<compPublications />);
    expect(compPublicationsSection).to.exist;
  });
});
