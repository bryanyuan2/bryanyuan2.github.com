/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var PublicationsContainer = require("../../js/app/section/publications.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compPublicationsSection;
var compRegionName = 'regionPublications';
var compTitle = 'Publications';

describe('compoent publications section', function(){
  before(function(done){
    compPublicationsSection = ReactTestUtils.renderIntoDocument(<PublicationsContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compPublicationsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compPublicationsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compPublicationsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
