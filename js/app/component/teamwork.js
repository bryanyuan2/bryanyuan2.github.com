"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var TeamworkContainer = createReactClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <span className="label label-info label-teamwork">Teamwork</span>
        );
    }
});

module.exports = TeamworkContainer;