var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var compNavinfo = require("../../js/app/section/navinfo.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent navinfo section', function(){
  it('should be rendered', function () {
    var compNavinfoSection = ReactTestUtils.renderIntoDocument(<compNavinfo />);
    expect(compNavinfo).to.exist;
  });
});
