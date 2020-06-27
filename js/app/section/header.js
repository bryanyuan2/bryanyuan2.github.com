/** @jsx React.DOM */

"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON;

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var HeaderContainer = createReactClass({
    mixins: [LoadJSON],
    propTypes: {
        data: PropTypes.object
    },
    getDefaultProps: function() {
        return {
          data: {}
        };
    },
    render: function() {
        return(
            <div id="region-header">
                <div className="header-bg"></div>
                <div className="jumbotron">
                    <h1 className="header-title">{this.state.data.title}</h1>
                </div>
                <div id="linkedin-nav">
                <a target="_blank" href={this.state.data.linkedin}>
                    <img src={this.state.data.linkedinImg} alt={this.state.data.linkedAlt} />
                    <div className="test_content">{this.state.data.linkedText}</div>
                </a>
              </div>
            </div>
        );
    }
});

module.exports = HeaderContainer;
