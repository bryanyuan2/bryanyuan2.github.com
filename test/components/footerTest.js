/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var FooterContainer = require("../../js/app/footer.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compFooterSection;
var compRegionName = 'regionFooter';

describe('compoent footer section', function(){
  before(function(done){
    compFooterSection = ReactTestUtils.renderIntoDocument(<FooterContainer />);
    done();
  });

  it('should be rendered', function () {
    expect(compFooterSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtilsAdditions.findRenderedDOMComponentWithId(compFooterSection, compRegionName))).to.exist;
  });
});
