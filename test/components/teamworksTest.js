/*jshint -W030 */
"use strict";

var React = require('react');
var TeamworkContainer = require("../../js/app/subcomponent/teamwork.js");
var testUtils = React.addons.TestUtils;

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
