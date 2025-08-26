/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CompSkills = require("./../../../js/app/section/skills.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var skillsJson = require('./../../../data/skills.json');

var reactTestRendererResult;
var CompSkillsElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompSkills url={skillsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-skills');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Technical Keywords');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompSkillsElement = testingLibraryReact.render(<CompSkills url={skillsJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompSkillsElement.getByText(/Technical Keywords/).textContent;
    expect(title).to.equal('Technical Keywords');
  });
});
