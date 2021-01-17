'use strict';

const React = require('react');
const PressList = require('./../component/presslist');
const InfoBar = require('./../component/infobar');
const Header = require('./../component/header');
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
            'speakerdeck': _.get(this.props, ['award', 'speakerdeck']),
            'youtube': _.get(this.props, ['award', 'youtube']),
            'github': _.get(this.props, ['award', 'github']),
        };

        var organizerHTML = this.props.award.title + (this.props.award.organizer ? ' / ' + '<a href="' + this.props.award.organizerUrl + '">' + this.props.award.organizer + '</a>' : '');

        return (
            <div className="data-awards row">
                <div className="col-md-2 text-date">
                    <p>{this.props.award.date}</p>
                </div>
                <div className="col-md-7">
                    <blockquote className={this.props.award.hl}>
                        <div className="text-title" dangerouslySetInnerHTML={{__html: organizerHTML}} />
                        {this.props.award.award &&
                            <div className="text-subtitle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-bookmark-check-fill text-svg-twitter-blue" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                </svg>
                                <span className="text-subtitle-italic" dangerouslySetInnerHTML={{__html: this.props.award.award}} />
                            </div>
                        }
                        <div className="text-desc">
                            {this.props.award.description}
                        </div>
                        <InfoBar info={infobarAry} />
                        <br />
                        { this.props.award.press && <PressList press={this.props.award.press} /> }
                    </blockquote>
                </div>
                <div className="col-md-3">
                    { this.props.award.image.src && <a target="_blank" rel="noopener noreferrer" href={this.props.award.image.url}><img width={this.props.award.image.width} height={this.props.award.image.height} className="img-rounded img-square" src={this.props.award.image.src} alt="yataiko"/></a> }
                    <div className="img-caption">{this.props.award.image.caption}</div>
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
            <div id="region-hackathon">
                <Header setID="awards" text="Hackathon Profiles & Awards" />
                <hr />
                {awards}
                <br />
            </div>
        );
    },
});

module.exports = AwardsContainer;
