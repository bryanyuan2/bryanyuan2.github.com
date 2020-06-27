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
        const date = [];
        const name = [];
        let productContent = '';
        let logoContent = '';
        let dateContent = '';
        let nameContent = '';

        this.props.work.corp.forEach(function(data) {
            if (data.name) {
                name.push('<div class="text-experience">');
                name.push('<a target="_blank" rel="noopener noreferrer" href=' + data.url + '>' + data.name + '</a>');
                if (data.position || data.org) {
                    name.push('<span class="text-desc"> / ' + data.position + (data.org ? ', ' + data.org : '') + '</span>');
                }
                name.push('</div>');
            }
            if (data.date) {
                date.push('<p>' + data.date + '</p>');
            }
            if (data.logo) {
                logo.push('<img id="' + data.name + '" width="' + data.width + '" height="' + data.height + '" src="' + data.logo + '" alt="' + data.logoalt + '" />');
            }
        });

        this.props.work.experience.forEach(function(content) {
            if (content.title) {
                description += '<div class="desc-title">' + content.title + '</div>';
            }
            if (content.description) {
                if (Array.isArray(content.description)) {
                    content.description.forEach(function(item) {
                        description += '<span>' + item + '</span>';
                    });
                } else {
                    description += '<span>' + content.description + '</span>';
                }
            }
        });

        if (this.props.work.product) {
            product.push('<div class="text-ref-set">');
            this.props.work.product.forEach(function(info) {
                product.push('<a href="' + info.link + '" target="_blank" rel="noopener noreferrer"><img class="text-ref-icon" src=' + info.img + ' alt=' + info.title + '/>' + '<span class="text-ref-title">' + info.title + '</span>' + '</a>');
            });
            product.push('</div>');
        }

        productContent = product.join('');
        logoContent = logo.join('');
        dateContent = date.join('');
        nameContent = name.join('');

        return (
            <div className="data-experience row">
                <div className="col-md-2 text-date">
                    <div dangerouslySetInnerHTML={{__html: dateContent}} />
                </div>
                <div className="col-md-8">
                    <blockquote className={this.props.work.hl} >
                        <div dangerouslySetInnerHTML={{__html: nameContent}} />
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
