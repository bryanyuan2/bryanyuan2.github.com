/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var FooterContainer = require("../../js/app/section/footer.js");
var testUtilsAdditions = require("react-testutils-additions");
var testUtils = require('react-addons-test-utils');

var expect = require('chai').expect;
var compFooterSection;
var compRegionName = 'region-footer';
var footerJson = require('./../../asserts/data/footer.json');

describe('compoent footer section', function(){
  before(function(done){
    compFooterSection = testUtils.renderIntoDocument(<FooterContainer />);
    compFooterSection.setState({data: footerJson});
    compFooterSection.setState({data: footerJson, test: 'testUpdateState'});
    done();
  });

  it('should be rendered', function () {
    expect(compFooterSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compFooterSection, compRegionName))).to.exist;
  });
});
