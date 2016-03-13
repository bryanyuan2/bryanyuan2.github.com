/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var TeamworkContainer = require("../../js/app/teamwork.js");
var testUtilsAdditions = require("react-testutils-additions");

var expect = require('chai').expect;
var compTeamworkSection;

describe('compoent teamwork section', function(){
  before(function(done){
    compTeamworkSection = ReactTestUtils.renderIntoDocument(<TeamworkContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compTeamworkSection).to.exist;
  });
});