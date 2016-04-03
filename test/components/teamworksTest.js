/*jshint -W030 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var TeamworkContainer = require("../../js/app/teamwork.js");
var testUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var compTeamworkSection;

describe('compoent teamwork section', function(){
  before(function(done){
    compTeamworkSection = testUtils.renderIntoDocument(<TeamworkContainer />);
    done();
  });

  it('container should be rendered', function () {
    expect(compTeamworkSection).to.exist;
  });
});
