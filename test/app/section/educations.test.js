/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CompEducations = require("./../../../js/app/section/educations.js");
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var educationsJson = require('./../../../data/educations.json');

var reactTestRendererResult;
var CompEducationElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompEducations url={educationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-education');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Education');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompEducationElement = testingLibraryReact.render(<CompEducations url={educationsJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompEducationElement.getByText(/Education/).textContent;
    expect(title).to.equal('Education');
  });
});
