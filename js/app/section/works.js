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
        media_content = [],
        product = [],
        product_content = [];

    this.props.work.experence.forEach(function(content) {
      description.push(content.description);
    });

    if (this.props.work.media) {
      media.push('<div class="text-media">');
      this.props.work.media.forEach(function(info) {
        media.push('<li><a target="_blank" href=' + info.link + '>' + info.title + ' - ' + info.source + '</a></li>');
      });
      media.push('</div>');
    }

    if (this.props.work.product) {
      product.push('<div class="text-ref-set">');
      this.props.work.product.forEach(function(info) {
        product.push('<a href="' + info.link + '" target="_blank"><img class="text-ref-icon" src=' + info.img + ' alt=' + info.title + '/>' + '<span class="text-ref-title">' + info.title + '</span>' + '</a>');
      });
      product.push('</div>');
    }

    media_content = media.join(" ");
    product_content = product.join(" ");

    return (
      <div className="row">
        <div className="col-md-2 text-date">
          <p>{this.props.work.date}</p>
        </div>
        <div className="col-md-8">
          <blockquote className={this.props.work.hl} >
            <div className="text-experience"><a target="_blank" href={this.props.work.url}>{this.props.work.corp}</a></div>
            <div className="text-desc">{this.props.work.position}, {this.props.work.org}</div>
            <ul className="text-desc">
              <span className="description">{description}</span>
            </ul>
            <br />
            <div dangerouslySetInnerHTML={{__html: media_content}} />
            <div dangerouslySetInnerHTML={{__html: product_content}} />
          </blockquote>
        </div>
        <div className="col-md-2 text-img-pure">
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
      <div id="region-experence">
        <h2 id="set-experence">Work experence</h2>
        <hr />
        {works}
        <br />
      </div>
    );
  }
});


module.exports = WorksContainer;
