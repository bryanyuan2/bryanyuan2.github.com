"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var infoBar = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        info: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
            info: {}
        };
    },
    render: function() {
        return (
            <div className="text-btn-group">
                { this.props.info.hackr && <a target="_blank" href={this.props.info.hackr} className="btn btn-default btn-sm block-btn" type="button">hackr</a> }
                { this.props.info.speakerdeck && <a target="_blank" href={this.props.info.speakerdeck} className="btn btn-default btn-sm block-btn" type="button">speakerdeck</a> }
                { this.props.info.store && <a target="_blank" href={this.props.info.store} className="btn btn-default btn-sm block-btn" type="button">chrome store</a> }
                { this.props.info.youtube && <a target="_blank" href={this.props.info.youtube} className="btn btn-default btn-sm block-btn" type="button">youtube</a> }
                { this.props.info.github && <a target="_blank" href={this.props.info.github} className="btn btn-default btn-sm block-btn" type="button">github</a> }
            </div>
        );
    }
});

module.exports = infoBar;