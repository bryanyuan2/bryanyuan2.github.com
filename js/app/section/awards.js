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
      media.push('<div class="text-media">');
      this.props.award.media.forEach(function(content) {
        media.push('<li><a target="_blank" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
      });
      media.push('</div>');
    }
    media_content = media.join(" ");

    return (
      <div className="row">
        <div className="col-md-2 text-date">
          <p>{this.props.award.date}</p>
        </div>
        <div className="col-md-7">
          <blockquote className={this.props.award.hl}>
            <span className="text-title" dangerouslySetInnerHTML={{__html: this.props.award.title}} />
            <TeamWork teamwork={this.props.award.teamwork} />
            <div className="text-desc">{this.props.award.description}</div>
            <div className="github-url"><a target="_blank" href={this.props.award.github}>{this.props.award.github}</a></div>
            <br />
            <div className="text-btn-group">
              { this.props.award.hackr && <a target="_blank" href={this.props.award.hackr} className="btn btn-default btn-sm block-btn" type="button">hackr</a> }
              { this.props.award.speakerdeck && <a target="_blank" href={this.props.award.speakerdeck} className="btn btn-default btn-sm block-btn" type="button">speakerdeck</a> }
              { this.props.award.store && <a target="_blank" href={this.props.award.store} className="btn btn-default btn-sm block-btn" type="button">chrome store</a> }
              { this.props.award.youtube && <a target="_blank" href={this.props.award.youtube} className="btn btn-default btn-sm block-btn" type="button">youtube</a> }
            </div>
            <br />
            <div dangerouslySetInnerHTML={{__html: media_content}} />
          </blockquote>
        </div>
        <div className="col-md-3">
          { this.props.award.image && <a target="_blank" href={this.props.award.imageurl}><img width={this.props.award.width} height={this.props.award.height} className="img-rounded text-img" src={this.props.award.image} alt="yataiko"/></a> }
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
      <div id="region-awards">
        <h2 id="set-awards">Awards</h2>
        <hr />
        {awards}
        <br />
      </div>
    );
  }
});


module.exports = AwardsContainer;
