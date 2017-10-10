"use strict";

var React = require('react'),
    TeamWork = require('./../component/teamwork'),
    MediaList = require('./../component/medialist'),
    InfoBar = require('./../component/infobar'),
    SectionHeader = require('./../component/sectionheader'),
    _ = require('lodash'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    PureRenderMixin = require('react-addons-pure-render-mixin');

var Award = React.createClass({
    mixins: [PureRenderMixin],
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

    render: function() {
        var infobarAry = {
            "hackr": _.get(this.props, ['award', 'hackr']),
            "speakerdeck": _.get(this.props, ['award', 'speakerdeck']),
            "store": _.get(this.props, ['award', 'store']),
            "youtube": _.get(this.props, ['award', 'youtube']),
            "github": _.get(this.props, ['award', 'github']),
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
                <SectionHeader setID="awards" text="Awards" />
                <hr />
                {awards}
                <br />
            </div>
        );
    }
});


module.exports = AwardsContainer;
