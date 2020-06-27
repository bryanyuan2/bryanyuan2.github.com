'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const SectionHeader = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        setID: PropTypes.string,
        text: PropTypes.string,
    },
    getDefaultProps: function() {
        return {
            setID: {},
            text: '',
        };
    },
    render: function() {
        const id = this.props.setID ? 'set-' + this.props.setID : 'set';
        return (
            <h2 className="set-title" id={id}>{this.props.text}</h2>
        );
    },
});

module.exports = SectionHeader;
