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
        summary: PropTypes.object,
        key: PropTypes.number,
    },
    getDefaultProps: function() {
        return {
            summary: {},
            key: 0,
        };
    },

    render: function() {
        return (
            <div className="data-summary">
                <div className="text-desc-list">
                    <span dangerouslySetInnerHTML={{__html: this.props.summary.text}} />
                </div>
            </div>
        );
    },
});

const SummaryContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const desc = [];
        this.state.data.forEach(function(summary, index) {
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
