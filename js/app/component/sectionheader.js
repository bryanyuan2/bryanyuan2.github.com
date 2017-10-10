"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var SectionHeader = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        setID: React.PropTypes.string,
        text: React.PropTypes.string
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