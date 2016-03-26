"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON;

var Skill = React.createClass({
  propTypes: {
    skill: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      skill: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    var items = [];
    this.props.skill.items.forEach(function(content) {
      items.push(content.name);
    });
    return (
      <div className="row">
        <div className="col-md-2 fs-16 text-date">
          <p>{this.props.skill.title}</p>
        </div>
        <div className="col-md-8 fs-16">
          <blockquote className={this.props.skill.hl}>
            {items.join(", ")}
          </blockquote>
        </div>
      </div>
    );
  }
});

var SkillsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var skills = [];
    this.state.data.forEach(function(skill, index) {
      skills.push(<Skill skill={skill} key={index} />);
    });
    return(
      <div id="region-skills">
      <h2 className="set-title" id="set-skills">Skills</h2>
      <hr />
      {skills}
      <br />
      </div>
    );
  }
});


module.exports = SkillsContainer;
