/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var AwardsContainer = require("../../js/app/section/awards.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = require('react-addons-test-utils');

var expect = require('chai').expect;
var compAwardsSection;
var compRegionName = 'region-awards';
var compTitle = 'Awards';
var awardsJson = require('./../../asserts/data/awards.json');

describe('compoent awards section', function(){
  before(function(done){
    compAwardsSection = testUtils.renderIntoDocument(<AwardsContainer />);
    compAwardsSection.setState({data: awardsJson});
    compAwardsSection.setState({data: awardsJson, test: 'testUpdateState'});
    done();
  });

  it('container should be rendered', function () {
    expect(compAwardsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compAwardsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compAwardsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
