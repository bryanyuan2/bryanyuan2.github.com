/*jshint -W030 */
"use strict";

var React = require('react/addons');
var ReactDOM = require('react-dom');
var WorksContainer = require("../../js/app/section/works.js");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compWorksSection;
var compRegionName = 'region-experence';
var compTitle = 'Work experence';
var worksJson = require('./../../asserts/data/works.json');

describe('compoent works section', function(){
  before(function(done){
    compWorksSection = testUtils.renderIntoDocument(<WorksContainer />);
    compWorksSection.setState({data: worksJson});
    done();
  });

  it('container should be rendered', function () {
    expect(compWorksSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithId(compWorksSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compWorksSection, 'h2')).textContent).to.equal(compTitle);
  });
});
