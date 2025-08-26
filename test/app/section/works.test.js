/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CompWorks = require("./../../../js/app/section/works.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var worksJson = require('./../../../data/works.json');

var reactTestRendererResult;
var CompWorksElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompWorks url={worksJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-experience');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Work Experience');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompWorksElement = testingLibraryReact.render(<CompWorks url={worksJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompWorksElement.getByText(/Work Experience/).textContent;
    expect(title).to.equal('Work Experience');
  });
});
