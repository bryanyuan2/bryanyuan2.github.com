/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var AwardsContainer = require("../../js/app/section/awards.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compAwardsSection;
var compRegionName = 'region-awards';
var compTitle = 'Awards';

describe('compoent awards section', function(){
  before(function(done){
    compAwardsSection = ReactTestUtils.renderIntoDocument(<AwardsContainer url="../../asserts/data/awards.json" />);
    done();
  });

  it('container should be rendered', function () {
    expect(compAwardsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compAwardsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compAwardsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
