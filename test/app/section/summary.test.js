/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CompSummary = require("./../../../js/app/section/summary.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var summaryJson = require('./../../../data/summary.json');

var reactTestRendererResult;
var CompSummaryElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompSummary url={summaryJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-summary');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Summary of Qualifications');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompSummaryElement = testingLibraryReact.render(<CompSummary url={summaryJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompSummaryElement.getByText(/Summary of Qualifications/).textContent;
    expect(title).to.equal('Summary of Qualifications');
  });
});
