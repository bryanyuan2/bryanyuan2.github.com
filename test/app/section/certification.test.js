/*jshint -W030 */
"use strict";

var React = require('react');
var CompCertification = require("../../../js/app/section/certification.js").default;
var ShallowTestRenderer = require('react-test-renderer/shallow');
var testingLibraryReact = require('@testing-library/react');
var expect = require('chai').expect;
var certificationsJson = require('./../../../data/certification.json');

var reactTestRendererResult;
var CompCertificationsElement;

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    var shadow = new ShallowTestRenderer();
    shadow.render(<CompCertification url={certificationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });
  
  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-certification');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Certification');
  });
});

describe('##react-test-renderer## testing', function(){
  beforeEach(function(done){
    CompCertificationsElement = testingLibraryReact.render(<CompCertification url={certificationsJson} />);
    done();
  });
  
  it('title should be rendered', function () {
    var title = CompCertificationsElement.getByText(/Certification/).textContent;
    expect(title).to.equal('Certification');
  });
});
