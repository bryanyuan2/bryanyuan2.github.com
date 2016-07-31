"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    SectionHeader = require('./../component/sectionheader'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var Skill = React.createClass({
  mixins: [PureRenderMixin],
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
      <SectionHeader setID="skills" text="Skills" />
      <hr />
      {skills}
      <br />
      </div>
    );
  }
});


module.exports = SkillsContainer;
