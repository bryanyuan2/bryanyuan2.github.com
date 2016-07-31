"use strict";

var React = require('react'),
    TeamWork = require('./../component/teamwork'),
    MediaList = require('./../component/medialist'),
    InfoBar = require('./../component/infobar'),
    SectionHeader = require('./../component/sectionheader'),
    _ = require('lodash'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    PureRenderMixin = require('react-addons-pure-render-mixin');

var Project = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    project: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      project: {},
      key: 0
    };
  },
  render: function() {
    var description = [];
    this.props.project.description.forEach(function(content) {
      description.push(content.text);
    });

    var infobarAry = {
      "speakerdeck": _.get(this.props, ['project', 'speakerdeck']),
      "store": _.get(this.props, ['project', 'store']),
      "github": _.get(this.props, ['project', 'github']),
    };

    return (
      <div className="row">
        <div className="col-md-2 text-date">
          <p>{this.props.project.date}</p>
        </div>
        <div className="col-md-7">
          <blockquote className={this.props.project.hl}>
          <div className="text-title">
            {this.props.project.link && <a href={this.props.project.link} target="_blank"> {this.props.project.name} </a>}
            {!this.props.project.link && this.props.project.name}
            <span className="fs-16"> - {this.props.project.from} </span>
          </div>
          <div className="text-desc">
            <TeamWork teamwork={this.props.project.teamwork} />
            {description}
          </div>
          <InfoBar info={infobarAry} />
          <br />
          { this.props.project.media && <MediaList media={this.props.project.media} /> }
          </blockquote>
        </div>
        <div className="col-md-3 pb-18">
          { this.props.project.image && <a target="_blank" href="#"><img width={this.props.project.width} height={this.props.project.height} className="img-rounded text-img" src={this.props.project.image} alt={this.props.project.name} /></a> }
        </div>
      </div>
    );
  }
});

var ProjectsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var projects = [];
    this.state.data.forEach(function(project, index) {
      projects.push(<Project project={project} key={index} />);
    });
    return(
      <div id="region-projects">
        <SectionHeader setID="projects" text="Projects" />
        <hr />
        {projects}
        <br />
      </div>
    );
  }
});

module.exports = ProjectsContainer;
