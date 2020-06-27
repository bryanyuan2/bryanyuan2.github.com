"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    SectionHeader = require('./../component/sectionheader');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var Education = createReactClass({
    honors: [],
    propTypes: {
        education: PropTypes.object,
        key: PropTypes.number
    },
    getDefaultProps: function() {
        return {
            education: {},
            key: 0
        };
    },
    shouldComponentUpdate: function() {
        // shouldComponentUpdate: function(nextProps, nextState)
        return false;
    },
    componentWillMount: function() {
        if (this.props.education.honors) {
            var that = this;
            this.props.education.honors.forEach(function(content) {
                that.honors.push('<strong>Honors</strong>: <a target="_blank" href="' + content.link + '">' + content.title + '</a>');
            });
        }
    },
    render: function() {
        return (
            <div className="data-education row">
                <div className="col-md-2 text-date">
                    <p>{this.props.education.date}</p>
                </div>
                <div className="col-md-10">
                    <blockquote className={this.props.education.hl}>
                        <p><strong>{this.props.education.degree}, <i>{this.props.education.school}</i></strong> - <a target="_blank" href="http://iisr.csie.ncu.edu.tw/">{this.props.education.lab}</a></p>
                        <ol>
                            { this.props.education.honors && <li dangerouslySetInnerHTML={{__html: this.honors}} />}
                            { this.props.education.description && <li>{this.props.education.description}</li>}
                        </ol>
                    </blockquote>
                </div>
            </div>
        );
    }
});

var EducationsContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        var educations = [];
        this.state.data.forEach(function(education, index) {
            educations.push(<Education education={education} key={index} />);
        });
        return(
            <div id="region-education">
                <SectionHeader setID="education" text="Education" />
                <hr />
                {educations}
                <br />
            </div>
        );
    }
});

module.exports = EducationsContainer;
