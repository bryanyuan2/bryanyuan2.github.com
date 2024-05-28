'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const Header = require('./../component/header');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Skill = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        skill: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            skill: {},
        };
    },
    render: function() {
        const items = [];
        this.props.skill.items.forEach(function(content) {
            items.push('<span class="text-hints">' +content.name + '</span>');
        });

        return (
            <div className="data-skills row">
                <div className="col-md-2 fs-16">
                    <p>{this.props.skill.title}</p>
                </div>
                <div className="col-md-8 fs-16">
                    <blockquote className={this.props.skill.hl}>
                        <div dangerouslySetInnerHTML={{__html: items.join(', ')}} />
                    </blockquote>
                </div>
            </div>
        );
    },
});

const SkillsContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const skills = [];
        this.state.data.forEach(function(skill, index) {
            // need to keep key={index} to avoid the following warning
            // warning: Each child in a list should have a unique "key" prop.
            skills.push(<Skill skill={skill} key={index} />);
        });

        return (
            <div id="region-skills">
                <Header setID="skills" text="Technical Keywords" />
                <hr />
                {skills}
                <br />
            </div>
        );
    },
});

module.exports = SkillsContainer;
