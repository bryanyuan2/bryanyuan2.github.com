"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON;

var Work = React.createClass({
  propTypes: {
    work: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      work: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    var description = [],
        media = [],
        media_content = [];
    this.props.work.experence.forEach(function(content) {
      description.push(content.description);
    });
    if (this.props.work.media) {
      media.push('<div class="reference">');
      this.props.work.media.forEach(function(content) {
        media.push('<li><a target="_blank" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
      });
      media.push('</div>');
    }
    media_content = media.join(" ");

    return (
      <div className="row-fluid">
        <div className="span2">
          <p>{this.props.work.date}</p>
        </div>
        <div className="span8">
          <blockquote>
            <div className="text_experience"><a target="_blank" href={this.props.work.url}>{this.props.work.corp}</a></div>
            <div className="text_description">{this.props.work.position}, {this.props.work.org}</div>
            <ul className="text_description">
              <span className="description">{description}</span>
            </ul>
            <br />
            <div dangerouslySetInnerHTML={{__html: media_content}} />
          </blockquote>
        </div>
        <div className="span2 img_span">
          <img id={this.props.work.corp} width={this.props.work.width} height={this.props.work.height} src={this.props.work.logo} alt={this.props.work.logoalt} />
        </div>
      </div>
    );
  }
});

var WorksContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var works = [];
    this.state.data.forEach(function(work, index) {
      works.push(<Work work={work} key={index} />);
    });
    return(
      <div id="regionExperence">
        <h2 id="setExperence">Work experence</h2>
        <hr />
        {works}
        <br />
      </div>
    );
  }
});


module.exports = WorksContainer;
