/*jshint -W030 */
"use strict";

var React = require('react'),
    ReactDOM = require('react-dom'),
    AwardsContainer = require("../../js/app/section/awards.js"),
    testUtilsAdditions = require("react-testutils-additions"),
    testUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var compAwardsSection,
    compRegionName = 'region-awards',
    compTitle = 'Awards',
    awardsJson = require('./../../asserts/data/awards.json');

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
