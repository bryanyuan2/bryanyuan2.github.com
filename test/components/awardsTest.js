/*jshint -W030 */
"use strict";

var React = require('react/addons');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var AwardsContainer = require("../../js/app/section/awards.js");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compAwardsSection;
var compRegionName = 'region-awards';
var compTitle = 'Awards';
var awardsJson = require('./../../asserts/data/awards.json');

describe('compoent awards section', function(){
  before(function(done){
    compAwardsSection = testUtils.renderIntoDocument(<AwardsContainer />);
    compAwardsSection.setState({data: awardsJson});
    done();
  });

  it('container should be rendered', function () {
    expect(compAwardsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithId(compAwardsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compAwardsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
