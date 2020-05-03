"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var SectionHeader = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        setID: PropTypes.string,
        text: PropTypes.string
    },
    getDefaultProps: function() {
        return {
            setID: {},
            text: ""
        };
    },
    render: function() {
        var id = this.props.setID ? "set-" + this.props.setID : "set"
        return (
            <h2 className="set-title" id={id}>{this.props.text}</h2>
        );
  }
});

module.exports = SectionHeader;