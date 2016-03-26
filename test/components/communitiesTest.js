/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var CommunitiesContainer = require("../../js/app/section/communities.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compCommunitiesSection;
var compRegionName = 'region-communities';
var compTitle = 'Communities';

describe('compoent communities section', function(){
  before(function(done){
    compCommunitiesSection = ReactTestUtils.renderIntoDocument(<CommunitiesContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compCommunitiesSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compCommunitiesSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compCommunitiesSection, 'h2')).textContent).to.equal(compTitle);
  });

});
