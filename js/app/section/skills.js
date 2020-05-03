"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    SectionHeader = require('./../component/sectionheader'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var Skill = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        skill: PropTypes.object
    },
    getDefaultProps: function() {
        return {
            skill: {}
        };
    },
    render: function() {
        var items = [];
        this.props.skill.items.forEach(function(content) {
            items.push(content.name);
        });

        return (
            <div className="data-skills row">
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

var SkillsContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        var skills = [];
        this.state.data.forEach(function(skill, index) {
          skills.push(<Skill skill={skill} />);
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
