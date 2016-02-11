"use strict";

var React = require('react');

var TeamworkContainer = React.createClass({
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    return (
      <span className="label label-info">Teamwork</span>
    );
  }
});


module.exports = TeamworkContainer;