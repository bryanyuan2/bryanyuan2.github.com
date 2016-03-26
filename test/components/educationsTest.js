/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var EducationsContainer = require("../../js/app/section/educations.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compEducationsSection;
var compRegionName = 'region-education';
var compTitle = 'Education';

describe('compoent educations section', function(){
  before(function(done){
    compEducationsSection = ReactTestUtils.renderIntoDocument(<EducationsContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compEducationsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compEducationsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compEducationsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
