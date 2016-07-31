/* jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CompNavInfoContainer = require("../../js/app/section/navinfo.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = require('react-addons-test-utils');
var jsdom = require('jsdom');

var expect = require('chai').expect;
var compNavinfoSection;
var compRegionSBName = "region-searchBox";
var compRegionResumeName = "region-resume";
var compContactsRegionName = "region-contacts";
var directDisplayJson = require('./../../asserts/data/directdisplay.json');
var contactJson = require('./../../asserts/data/contact.json');

describe('compoent navinfo section', function(){
  before(function(done){
    var html = '';
    var doc = jsdom.jsdom(html),
    window = doc.parentWindow,
    $ = require('jquery')(window);
    compNavinfoSection = testUtils.renderIntoDocument(<CompNavInfoContainer />);
    compNavinfoSection.setState({data: directDisplayJson, subData: contactJson});
    compNavinfoSection.setState({data: directDisplayJson, subData: contactJson, test: 'testUpdateState'});
    done();
  });

  it('should be rendered', function () {
    expect(compNavinfoSection).to.exist;
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

});
