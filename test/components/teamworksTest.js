/*jshint -W030 */
"use strict";

var React = require('react');
var TeamworkContainer = require("../../js/app/component/teamwork.js");
var testUtils = require('react-addons-test-utils');

var expect = require('chai').expect;
var compTeamworkSection;

describe('compoent teamwork section', function(){
  before(function(done){
    compTeamworkSection = testUtils.renderIntoDocument(<TeamworkContainer />);
    compTeamworkSection.setState({test: 'testUpdateState'});
    done();
  });

  it('container should be rendered', function () {
    expect(compTeamworkSection).to.exist;
  });
});
