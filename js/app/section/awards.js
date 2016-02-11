"use strict";

var React = require('react'),
    TeamWork = require('./../teamwork'),
    LoadJSON = require('./../mixins').LoadJSON;

var Award = React.createClass({
  propTypes: {
    award: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      award: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    var media = [],
        media_content = "";
    if (this.props.award.media) {
      media.push('<div class="reference">');
      this.props.award.media.forEach(function(content) {
        media.push('<li><a target="_blank" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
      });
      media.push('</div>');
    }
    media_content = media.join(" ");

    return (
      <div className="row-fluid">
        <div className="span2">
          <p>{this.props.award.date}</p>
        </div>
        <div className="span7">
          <blockquote>
            <span className="textTitle" dangerouslySetInnerHTML={{__html: this.props.award.title}} />
            <TeamWork teamwork={this.props.award.teamwork} />
            <div className="text_description">{this.props.award.description}</div>
            <div className="github_url"><a target="_blank" href={this.props.award.github}>{this.props.award.github}</a></div>
            <br />
            <div>
              { this.props.award.hackr && <a target="_blank" href={this.props.award.hackr} className="btn btn-small mr-3" type="button">hackr</a> }
              { this.props.award.speakerdeck && <a target="_blank" href={this.props.award.speakerdeck} className="btn btn-small mr-3" type="button">speakerdeck</a> }
              { this.props.award.store && <a target="_blank" href={this.props.award.store} className="btn btn-small mr-3" type="button">chrome store</a> }
              { this.props.award.youtube && <a target="_blank" href={this.props.award.youtube} className="btn btn-small mr-3" type="button">youtube</a> }
            </div>
            <br />
            <div dangerouslySetInnerHTML={{__html: media_content}} />
          </blockquote>
        </div>
        <div className="span3">
          { this.props.award.image && <a target="_blank" href={this.props.award.imageurl}><img width={this.props.award.width} height={this.props.award.height} className="img-rounded data_img" src={this.props.award.image} alt="yataiko"/></a> }
        </div>
      </div>
    );
  }
});

var AwardsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var awards = [];
    this.state.data.forEach(function(award, index) {
      awards.push(<Award award={award} key={index} />);
    });
    return(
      <div id="regionAwards">
        <h2 id="setAwards">Awards</h2>
        <hr />
        {awards}
        <br />
      </div>
    );
  }
});


module.exports = AwardsContainer;
