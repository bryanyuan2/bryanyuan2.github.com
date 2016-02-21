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
      <div className="row-fluid">
        <div className="span2 fs-16">
          <p>{this.props.skill.title}</p>
        </div>
        <div className="span8 fs-16">
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
      <div id="regionSkills">
      <h2 id="setSkills">Skills</h2>
      <hr />
      {skills}
      <br />
      </div>
    );
  }
});


module.exports = SkillsContainer;
