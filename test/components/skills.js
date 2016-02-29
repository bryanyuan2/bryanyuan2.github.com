var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compSkills = require("../../js/app/section/skills.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent skills section', function(){
  it('should be rendered', function () {
    var compSkillsSection = ReactTestUtils.renderIntoDocument(<compSkills />);
    expect(compSkillsSection).to.exist;
  });
});
