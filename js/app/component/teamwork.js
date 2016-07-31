"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var TeamworkContainer = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <span className="label label-info label-teamwork">Teamwork</span>
        );
  }
});

module.exports = TeamworkContainer;