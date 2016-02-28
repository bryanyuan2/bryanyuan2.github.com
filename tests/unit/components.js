var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
//var TestUtils = require('react/lib/ReactTestUtils');
var compHeader = require("../../js/app/footer.js");

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('compoent header', function(){
  it('should be rendered', function () {
    var compHeader = ReactTestUtils.renderIntoDocument(<compHeader />);
    expect(compHeader).to.exist;
  });
});
