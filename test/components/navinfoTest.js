/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var CompNavInfoContainer = require("../../js/app/section/navinfo.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compNavinfoSection;
var compRegionName = "region-navInfo";
var compRegionSBName = "region-searchBox";
var compRegionResumeName = "region-resume";
var compContactsRegionName = "region-contacts";

describe('compoent navinfo section', function(){
  before(function(done){
    compNavinfoSection = ReactTestUtils.renderIntoDocument(<CompNavInfoContainer />);
    done();
  });

  /*
  it('should be rendered', function () {
    expect(compNavinfoSection).to.exist;
  });

  it('region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compNavinfoSection, compRegionName))).to.exist;
  });

  it('region search box should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compNavinfoSection, compRegionSBName))).to.exist;
  });

  it('region resume should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compNavinfoSection, compRegionResumeName))).to.exist;
  });

  it('region contacts should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compNavinfoSection, compContactsRegionName))).to.exist;
  });
  */

});
