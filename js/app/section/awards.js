'use strict';

const React = require('react');
const TeamWork = require('./../component/teamwork');
const MediaList = require('./../component/medialist');
const InfoBar = require('./../component/infobar');
const SectionHeader = require('./../component/sectionheader');
const _ = require('lodash');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Award = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        award: PropTypes.object,
        key: PropTypes.number,
    },
    getDefaultProps: function() {
        return {
            award: {},
            key: 0,
        };
    },

    render: function() {
        const infobarAry = {
            'hackr': _.get(this.props, ['award', 'hackr']),
            'speakerdeck': _.get(this.props, ['award', 'speakerdeck']),
            'store': _.get(this.props, ['award', 'store']),
            'youtube': _.get(this.props, ['award', 'youtube']),
            'github': _.get(this.props, ['award', 'github']),
        };

        return (
            <div className="data-awards row">
                <div className="col-md-2 text-date">
                    <p>{this.props.award.date}</p>
                </div>
                <div className="col-md-7">
                    <blockquote className={this.props.award.hl}>
                        <span className="text-title" dangerouslySetInnerHTML={{__html: this.props.award.title}} />
                        <div className="text-desc">
                            <TeamWork teamwork={this.props.award.teamwork} />
                            {this.props.award.description}
                        </div>
                        <InfoBar info={infobarAry} />
                        <br />
                        { this.props.award.media && <MediaList media={this.props.award.media} /> }
                    </blockquote>
                </div>
                <div className="col-md-3">
                    { this.props.award.image && <a target="_blank" rel="noopener noreferrer" href={this.props.award.imageurl}><img width={this.props.award.width} height={this.props.award.height} className="img-rounded text-img" src={this.props.award.image} alt="yataiko"/></a> }
                </div>
            </div>
        );
    },
});

const AwardsContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const awards = [];
        this.state.data.forEach(function(award, index) {
            awards.push(<Award award={award} key={index} />);
        });
        return (
            <div id="region-awards">
                <SectionHeader setID="awards" text="Awards" />
                <hr />
                {awards}
                <br />
            </div>
        );
    },
});


module.exports = AwardsContainer;
