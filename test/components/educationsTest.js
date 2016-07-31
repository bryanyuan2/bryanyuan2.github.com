/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var EducationsContainer = require("../../js/app/section/educations.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = require('react-addons-test-utils');

var expect = require('chai').expect;
var compEducationsSection;
var compRegionName = 'region-education';
var compTitle = 'Education';
var educationsJson = require('./../../asserts/data/educations.json');

describe('compoent educations section', function(){
  before(function(done){
    compEducationsSection = testUtils.renderIntoDocument(<EducationsContainer />);
    compEducationsSection.setState({data: educationsJson});
    compEducationsSection.setState({data: educationsJson, test: 'testUpdateState'});
    done();
  });

  it('container should be rendered', function () {
    expect(compEducationsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compEducationsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compEducationsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
