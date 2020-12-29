'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const infoBar = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        info: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            info: {},
        };
    },
    render: function() {
        return (
            <div className="btn-block-group">
                { this.props.info.github && <a target="_blank" rel="noopener noreferrer" href={this.props.info.github} className="btn btn-default btn-sm btn-block-default" type="button">github</a> }
                { this.props.info.speakerdeck && <a target="_blank" rel="noopener noreferrer" href={this.props.info.speakerdeck} className="btn btn-default btn-sm btn-block-default" type="button">speakerdeck</a> }
                { this.props.info.youtube && <a target="_blank" rel="noopener noreferrer" href={this.props.info.youtube} className="btn btn-default btn-sm btn-block-default" type="button">youtube</a> }
            </div>
        );
    },
});

module.exports = infoBar;
