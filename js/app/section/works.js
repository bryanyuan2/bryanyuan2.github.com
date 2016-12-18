"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    MediaList = require('./../component/medialist'),
    SectionHeader = require('./../component/sectionheader'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var Work = React.createClass({
  mixins: [PureRenderMixin],
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
  render: function() {
    var description = '',
        product = [],
        product_content = [];

    this.props.work.experience.forEach(function(content) {
      if (content.items) {
        if (content.description) {
          description += '<span>' + content.description + '</span>';  
        }

        content.items.forEach(function(item) {
          description += '<span class="sub-items">' + item + '</span>';  
        });     

      } else if (content.description) {
        description += '<span>' + content.description + '</span>';
      }
    });

    if (this.props.work.product) {
      product.push('<div class="text-ref-set">');
      this.props.work.product.forEach(function(info) {
        product.push('<a href="' + info.link + '" target="_blank"><img class="text-ref-icon" src=' + info.img + ' alt=' + info.title + '/>' + '<span class="text-ref-title">' + info.title + '</span>' + '</a>');
      });
      product.push('</div>');
    }

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
              <div className="description" dangerouslySetInnerHTML={{__html: description}} />
            </ul>
            <br />
            { this.props.work.media && <MediaList media={this.props.work.media} /> }
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
      <div id="region-experience">
        <SectionHeader setID="experience" text="Work experience" />
        <hr />
        {works}
        <br />
      </div>
    );
  }
});


module.exports = WorksContainer;
