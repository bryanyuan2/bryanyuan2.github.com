"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    SectionHeader = require('./../component/sectionheader'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var Community = React.createClass({
  mixins: [PureRenderMixin],
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
  render: function () {
    var description = '';
    this.props.community.description.forEach(function(content) {
      description += '<span>' + content.text + '</span>';
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
              <ul className="text-desc">
                <div className="description" dangerouslySetInnerHTML={{__html: description}} />
              </ul>
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
        <SectionHeader setID="communities" text="Communities" />
        <hr />
        {communities}
        <br />
      </div>
    );
  }
});

module.exports = CommunitiesContainer;
