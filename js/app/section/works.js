'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const MediaList = require('./../component/medialist');
const AwardsList = require('./../component/awardslist');
const SectionHeader = require('./../component/sectionheader');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');


const Work = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        work: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            work: {},
        };
    },
    render: function() {
        let description = '';
        const product = [];
        const logo = [];
        let productContent = '';
        let logoContent = '';
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
                product.push('<a href="' + info.link + '" target="_blank" rel="noopener noreferrer"><img class="text-ref-icon" src=' + info.img + ' alt=' + info.title + '/>' + '<span class="text-ref-title">' + info.title + '</span>' + '</a>');
            });
            product.push('</div>');
        }

        if (this.props.work.logo) {
            const self = this;
            this.props.work.logo.forEach(function(data) {
                logo.push('<img id="' + self.props.work.corp + '" width="' + self.props.work.width + '" height="' + self.props.work.height + '" src="' + data + '" alt="' + self.props.work.logoalt + '" />');
            });
        }

        productContent = product.join(' ');
        logoContent = logo.join(' ');

        return (
            <div className="data-experience row">
                <div className="col-md-2 text-date">
                    <p>{this.props.work.date}</p>
                    <p>{this.props.work.alignDate}</p>
                </div>
                <div className="col-md-8">
                    <blockquote className={this.props.work.hl} >
                        <div className="text-experience">
                            <a target="_blank" rel="noopener noreferrer" href={this.props.work.url}>{this.props.work.corp}</a>
                        </div>
                        <div className="text-experience">
                            { this.props.work.alignCorp && <a target="_blank" rel="noopener noreferrer" href={this.props.work.alignUrl}>{this.props.work.alignCorp}</a> }
                        </div>
                        <div className="text-desc">{this.props.work.position}, {this.props.work.org}</div>
                        <ul className="text-desc">
                            <div className="description" dangerouslySetInnerHTML={{__html: description}} />
                        </ul>
                        { this.props.work.awards && <AwardsList awards={this.props.work.awards} /> }
                        <br />
                        { this.props.work.media && <MediaList media={this.props.work.media} /> }
                        <div dangerouslySetInnerHTML={{__html: productContent}} />
                    </blockquote>
                </div>
                <div className="col-md-2 text-img-pure">
                    <div dangerouslySetInnerHTML={{__html: logoContent}} />
                </div>
            </div>
        );
    },
});

const WorksContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const works = [];
        this.state.data.forEach(function(work, index) {
            works.push(<Work work={work} />);
        });
        return (
            <div id="region-experience">
                <SectionHeader setID="experience" text="Work experience" />
                <hr />
                {works}
                <br />
            </div>
        );
    },
});

module.exports = WorksContainer;
