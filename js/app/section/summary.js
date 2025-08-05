'use strict';

const React = require('react');
const Header = require('./../component/header');
const _ = require('lodash');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Summary = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        summary: PropTypes.object
    },
    getDefaultProps: function() {
        return {
            summary: {}
        };
    },

    render: function() {
        var output = '';

        if (this.props.summary.level) {
            output += '<div class="text-summary-title">' + this.props.summary.level + '</div>';
        }

        this.props.summary.items.forEach(function(content) {
            output += ('<div class="text-summary">' + content + '</div>');
        });

        return (
            <div className="data-summary">
                <div dangerouslySetInnerHTML={{__html: output}} />
            </div>
        );
    },
});

const SummaryContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const desc = [];
        this.state.data.forEach(function(summary, index) {
            // need to keep key={index} to avoid the following warning
            // warning: Each child in a list should have a unique "key" prop.
            desc.push(<Summary summary={summary} key={index} />);
        });
        return (
            <div id="region-summary">
                <Header setID="desc" text="Summary of Qualifications" />
                <hr />
                {desc}
                <br />
            </div>
        );
    },
});

module.exports = SummaryContainer;
