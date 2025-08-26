/*jshint -W030 */
"use strict";

var React = require('react');
var CompHackathon = require("./../../../js/app/section/hackathon.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var hackathonJson = require('./../../../data/hackathon.json');

var reactTestRendererResult;
var CompHackathonElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompHackathon url={hackathonJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-hackathon');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Hackathon Profiles & Awards');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompHackathonElement = testingLibraryReact.render(<CompHackathon url={hackathonJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompHackathonElement.getByText(/Hackathon Profiles & Awards/).textContent;
    expect(title).to.equal('Hackathon Profiles & Awards');
  });
});
