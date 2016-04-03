/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var HeaderContainer = require("../../js/app/header.js");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compHeaderSection;
var compHeaderTitle = "header-title";
var compLinkedinNav = "linkedin-nav";
var compHeaderBg = "header-bg";

describe('compoent header section', function(){
  before(function(done){
    compHeaderSection = testUtils.renderIntoDocument(<HeaderContainer />);
    done();
  });

  it('should be rendered', function () {
    expect(compHeaderSection).to.exist;
  });

  it('header title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(compHeaderSection, compHeaderTitle))).to.exist;
  });

  it('header background image should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithClass(compHeaderSection, compHeaderBg))).to.exist;
  });

  it('linkedin nav should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithId(compHeaderSection, compLinkedinNav))).to.exist;
  });
});
