'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const SectionHeader = require('./../component/sectionheader');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Community = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        community: PropTypes.object,
        key: PropTypes.number,
    },
    getDefaultProps: function() {
        return {
            community: {},
            key: 0,
        };
    },
    render: function() {
        let description = '';
        this.props.community.description.forEach(function(content) {
            description += '<span>' + content.text + '</span>';
        });

        return (
            <div>
                <div className="data-communities row">
                    <div className="col-md-2 text-date">
                        <p>{this.props.community.date}</p>
                    </div>

                    <div className="col-md-8">
                        <blockquote className={this.props.community.hl}>
                            <div className="text-title"><a target="_blank" rel="noopener noreferrer" href={this.props.community.link}>{this.props.community.name}</a></div>
                            <div className="text-desc">{this.props.community.position}</div>
                            <ul className="text-desc">
                                <div className="description" dangerouslySetInnerHTML={{__html: description}} />
                            </ul>
                        </blockquote>
                    </div>
                    <div className="col-md-2 text-img-pure">
                        <img src={this.props.community.image} alt={this.props.community.name} />
                    </div>
                </div>
                <br />
            </div>
        );
    },
});

const CommunitiesContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const communities = [];
        this.state.data.forEach(function(community, index) {
            communities.push(<Community community={community} key={index} />);
        });
        return (
            <div id="region-communities">
                <SectionHeader setID="communities" text="Communities" />
                <hr />
                {communities}
                <br />
            </div>
        );
    },
});

module.exports = CommunitiesContainer;
