/*jshint -W030 */
"use strict";

var React = require('react/addons');
var ReactDOM = require('react-dom');
var SkillsContainer = require("../../js/app/section/skills.js");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compSkillsSection;
var compRegionName = 'region-skills';
var compTitle = 'Skills';
var skillsJson = require('./../../asserts/data/skills.json');

describe('compoent skills section', function(){
  before(function(done){
    compSkillsSection = testUtils.renderIntoDocument(<SkillsContainer />);
    compSkillsSection.setState({data: skillsJson});
    done();
  });

  it('container should be rendered', function () {
    expect(compSkillsSection).to.exist;
  });

  it('container region should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithId(compSkillsSection, compRegionName))).to.exist;
  });

  it('title should be rendered', function () {
    expect(ReactDOM.findDOMNode(testUtils.findRenderedDOMComponentWithTag(compSkillsSection, 'h2')).textContent).to.equal(compTitle);
  });
});
