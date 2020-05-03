"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    MediaList = require('./../component/medialist'),
    AwardsList = require('./../component/awardslist'),
    SectionHeader = require('./../component/sectionheader'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');



var Work = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        work: PropTypes.object
    },
    getDefaultProps: function() {
        return {
            work: {}
        };
    },
    render: function() {
        var description = '',
            product = [],
            logo = [],
            product_content = '',
            logo_content = '';
        this.props.work.experience.forEach(function(content) {
            if (content.items) {
                if (content.description) {
                    description += '<span>' + content.description + '</span>';  
                }

                content.items.forEach(function(item) {
                    if (item) {
                        description += '<span class="sub-items">' + item + '</span>';
                    }
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

        if(this.props.work.logo) {
            var self = this;
            this.props.work.logo.forEach(function(data) {
                logo.push('<img id="' + self.props.work.corp + '" width="' + self.props.work.width + '" height="' + self.props.work.height + '" src="' + data + '" alt="' + self.props.work.logoalt + '" />');
            });
        }

        product_content = product.join(' ');
        logo_content = logo.join(' ');

        return (
            <div className="data-experience row">
                <div className="col-md-2 text-date">
                    <p>{this.props.work.date}</p>
                    <p>{this.props.work.alignDate}</p>
                </div>
                <div className="col-md-8">
                    <blockquote className={this.props.work.hl} >
                        <div className="text-experience">
                            <a target="_blank" href={this.props.work.url}>{this.props.work.corp}</a>
                        </div>
                        <div className="text-experience">
                            { this.props.work.alignCorp && <a target="_blank" href={this.props.work.alignUrl}>{this.props.work.alignCorp}</a> }
                        </div>
                        <div className="text-desc">{this.props.work.position}, {this.props.work.org}</div>
                        <ul className="text-desc">
                          <div className="description" dangerouslySetInnerHTML={{__html: description}} />
                        </ul>
                        { this.props.work.awards && <AwardsList awards={this.props.work.awards} /> }
                        <br />
                        { this.props.work.media && <MediaList media={this.props.work.media} /> }
                        <div dangerouslySetInnerHTML={{__html: product_content}} />
                    </blockquote>
                </div>
                <div className="col-md-2 text-img-pure">
                    <div dangerouslySetInnerHTML={{__html: logo_content}} />
                </div>
            </div>
        );
    }
});

var WorksContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        var works = [];
        this.state.data.forEach(function(work, index) {
            works.push(<Work work={work} />);
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
