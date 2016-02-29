var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compProjects = require("../../js/app/section/projects.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent projects section', function(){
  it('should be rendered', function () {
    var compProjectsSection = ReactTestUtils.renderIntoDocument(<compProjects />);
    expect(compProjectsSection).to.exist;
  });
});
