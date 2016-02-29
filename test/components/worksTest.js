/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var WorksContainer = require("../../js/app/section/works.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compWorksSection;
var compRegionName = 'regionExperence';
var compTitle = 'Work experence';

describe('compoent works section', function(){
  before(function(done){
    compWorksSection = ReactTestUtils.renderIntoDocument(<WorksContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compWorksSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compWorksSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(compWorksSection, 'h2')).textContent).to.equal(compTitle);
  });
});
