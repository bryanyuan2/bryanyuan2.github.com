/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ProjectsContainer = require("../../js/app/section/projects.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = require('react-addons-test-utils');

var expect = require('chai').expect;
var compProjectsSection;
var compRegionName = 'region-projects';
var compTitle = 'Projects';
var projectsJson = require('./../../asserts/data/projects.json');

describe('compoent projects section', function(){
  before(function(done){
    compProjectsSection = testUtils.renderIntoDocument(<ProjectsContainer />);
    compProjectsSection.setState({data: projectsJson});
    compProjectsSection.setState({data: projectsJson, test: 'testUpdateState'});
    done();
  });

  it('container should be rendered', function () {
    expect(compProjectsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compProjectsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compProjectsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
