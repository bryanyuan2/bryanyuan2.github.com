"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON;

var Community = React.createClass({
  propTypes: {
    community: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      community: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function () {
    
    var description = [];
    this.props.community.description.forEach(function(content) {
      description.push(content.text);
    });
    
    return (
      <div>
        <div className="row">
          <div className="col-md-2 text-date">
            <p>{this.props.community.date}</p>
          </div>

          <div className="col-md-8">
            <blockquote className={this.props.community.hl}>
              <div className="text-title"><a target="_blank" href={this.props.community.link}>{this.props.community.name}</a></div>
              <div className="text-desc">{this.props.community.position}</div>
              <div className="text-desc">{description}</div>
            </blockquote>
          </div>
          <div className="col-md-2 text-img-pure">
            <img src={this.props.community.image} alt={this.props.community.name} />
          </div>
        </div>
        <br />
      </div>
    );
  }
});

var CommunitiesContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var communities = [];
    this.state.data.forEach(function(community, index) {
      communities.push(<Community community={community} key={index} />);
    });
    return (
      <div id="region-communities">
        <h2 id="set-communities">Communities</h2>
        <hr />
        {communities}
        <br />
      </div>
    );
  }
});

module.exports = CommunitiesContainer;
