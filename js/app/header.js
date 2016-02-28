"use strict";

var React = require('react'),
    LoadJSON = require('./mixins').LoadJSON;

var HeaderContainer = React.createClass({
  mixins: [LoadJSON],
  propTypes: {
    data: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      data: {}
    };
  },
  render: function() {
    return(
      <div id="regionHeader">
        <div className="header_bg"></div>
        <div className="jumbotron">
          <h1 className="header_title">{this.state.data.title}</h1>
        </div>
        <a target="_blank" href={this.state.data.facebook}>
          <img width="160" height="160" className="header_avatar img-circle" src={this.state.data.avatar} alt="avatar" />
        </a>

        <div id="linkedin_nav">
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
