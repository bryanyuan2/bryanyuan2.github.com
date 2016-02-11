"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON;

var Education = React.createClass({
  propTypes: {
    education: React.PropTypes.object,
    key: React.PropTypes.number
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
  render: function() {
    var honors = [];
    if (this.props.education.honors) {
      this.props.education.honors.forEach(function(content) {
        honors.push('<strong>Honors</strong>: <a target="_blank" href="' + content.link + '">' + content.title + '</a>');
      });
    }
    return (
      <div className="row-fluid">
        <div className="span2">
          <p>{this.props.education.date}</p>
        </div>
        <div className="span10">
          <p><strong>{this.props.education.degree}, <i>{this.props.education.school}</i></strong> - <a target="_blank" href="http://iisr.csie.ncu.edu.tw/">{this.props.education.lab}</a></p>
          <ol>
            { this.props.education.honors && <li dangerouslySetInnerHTML={{__html: honors}} />}
            { this.props.education.description && <li>{this.props.education.description}</li>}
          </ol>
        </div>
      </div>
    );
  }
});

var EducationsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var educations = [];
    this.state.data.forEach(function(education, index) {
      educations.push(<Education education={education} key={index} />);
    });
    return(
      <div id="regionEducation">
        <h2 id="setEducation">Education</h2>
        <hr />
        {educations}
        <br />
      </div>
    );
  }
});


module.exports = EducationsContainer;
