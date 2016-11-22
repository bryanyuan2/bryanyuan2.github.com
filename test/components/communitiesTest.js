/*jshint -W030 */
"use strict";

var React = require('react'),
    ReactDOM = require('react-dom'),
    CommunitiesContainer = require("../../js/app/section/communities.js"),
    testUtilsAdditions = require("react-testutils-additions"),
    testUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,

var compCommunitiesSection,
    compRegionName = 'region-communities',
    compTitle = 'Communities',
    communitiesJson = require('./../../asserts/data/communities.json');

describe('compoent communities section', function(){
  before(function(done){
    compCommunitiesSection = testUtils.renderIntoDocument(<CommunitiesContainer />);
    compCommunitiesSection.setState({data: communitiesJson});
    compCommunitiesSection.setState({data: communitiesJson, test: 'testUpdateState'});
    done();
  });

  it('container should be rendered', function () {
    expect(compCommunitiesSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compCommunitiesSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compCommunitiesSection, 'h2')).textContent).to.equal(compTitle);
  });

});
