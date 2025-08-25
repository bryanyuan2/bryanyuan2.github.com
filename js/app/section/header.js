'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const HeaderContainer = createReactClass({
    mixins: [LoadJSON],
    propTypes: {
        data: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            data: {},
        };
    },
    render: function() {
        return (
            <div id="region-header">
                <div className="header-bg">
                    <div className="header-title">{this.state.data.title}</div>
                </div>
                <div id="linkedin-nav">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.data.linkedin}>
                        <img src={this.state.data.linkedinImg} alt={this.state.data.linkedAlt} />
                        <div className="test_content">{this.state.data.linkedText}</div>
                    </a>
                </div>
            </div>
        );
    },
});

module.exports = HeaderContainer;
