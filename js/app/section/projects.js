"use strict";

var React = require('react'),
    TeamWork = require('./../teamwork'),
    LoadJSON = require('./../mixins').LoadJSON;

var Project = React.createClass({
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
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    var description = [];
    this.props.project.description.forEach(function(content) {
      description.push(content.text);
    });
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
            <TeamWork teamwork={this.props.project.teamwork} />
          </div>
          <div className="text-desc">{description}</div>
          { this.props.project.github && <div className="github-url"><a target="_blank" href={this.props.project.github}>{this.props.project.github}</a></div> }
          <br />
          <div>
            { this.props.project.speakerdeck && <a target="_blank" href={this.props.project.speakerdeck} className="btn btn-default btn-sm block-btn" type="button">speakerdeck</a> }
            { this.props.project.store && <a target="_blank" href={this.props.project.store} className="btn btn-default btn-sm block-btn" type="button">chrome store</a> }
          </div>
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
        <h2 id="set-projects">Projects</h2>
        <hr />
        {projects}
        <br />
      </div>
    );
  }
});

module.exports = ProjectsContainer;
