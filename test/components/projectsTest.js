/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var ProjectsContainer = require("../../js/app/section/projects.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compProjectsSection;
var compRegionName = 'regionProjects';
var compTitle = 'Projects';

describe('compoent projects section', function(){
  before(function(done){
    compProjectsSection = ReactTestUtils.renderIntoDocument(<ProjectsContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compProjectsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compProjectsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compProjectsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
