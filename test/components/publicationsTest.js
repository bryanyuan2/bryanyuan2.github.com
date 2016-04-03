/*jshint -W030 */
"use strict";

var React = require('react/addons');
var ReactDOM = require('react-dom');
var PublicationsContainer = require("../../js/app/section/publications.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compPublicationsSection;
var compRegionName = 'region-publications';
var compTitle = 'Publications';
var publicationsJson = require('./../../asserts/data/publications.json');

describe('compoent publications section', function(){
  before(function(done){
    compPublicationsSection = testUtils.renderIntoDocument(<PublicationsContainer />);
    compPublicationsSection.setState({data: publicationsJson});
    done();
  });

  it('container should be rendered', function () {
    expect(compPublicationsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compPublicationsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compPublicationsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
