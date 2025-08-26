/*jshint -W030 */
"use strict";

var React = require('react');
var CompPublications = require("./../../../js/app/section/publications.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var publicationsJson = require('./../../../data/publications.json');

var reactTestRendererResult;
var CompPublicationsElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompPublications url={publicationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-publications');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Publications');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompPublicationsElement = testingLibraryReact.render(<CompPublications url={publicationsJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompPublicationsElement.getByText(/Publications/).textContent;
    expect(title).to.equal('Publications');
  });
});
