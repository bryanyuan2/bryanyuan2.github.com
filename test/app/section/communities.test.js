/*jshint -W030 */
"use strict";

var React = require('react');
var CompCommunities = require("./../../../js/app/section/communities.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var communitiesJson = require('./../../../data/communities.json');

var reactTestRendererResult;
var CompCommunitiesElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompCommunities url={communitiesJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-communities');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Communities');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompCommunitiesElement = testingLibraryReact.render(<CompCommunities url={communitiesJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompCommunitiesElement.getByText(/Communities/).textContent;
    expect(title).to.equal('Communities');
  });
});
