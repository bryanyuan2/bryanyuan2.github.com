'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const SectionHeader = require('./../component/sectionheader');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Publication =createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        publication: PropTypes.object,
        key: PropTypes.number,
    },
    getDefaultProps: function() {
        return {
            publication: {},
            key: 0,
        };
    },
    render: function() {
        return (
            <div className="data-publications row">
                <div className="col-md-2 text-date">
                    <p>{this.props.publication.date}</p>
                </div>
                <div className="col-md-10">
                    <blockquote className={this.props.publication.hl}>
                        <p>
                            “<a target="_blank" rel="noopener noreferrer" href={this.props.publication.link}>{this.props.publication.name}</a>”<br />
                            {this.props.publication.publication}<br />
                            <i dangerouslySetInnerHTML={{__html: this.props.publication.authors}} />
                        </p>
                    </blockquote>
                </div>
            </div>
        );
    },
});

const PublicationsContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const publications = [];
        this.state.data.forEach(function(publication, index) {
            publications.push(<Publication publication={publication} key={index} />);
        });
        return (
            <div id="region-publications">
                <SectionHeader setID="publications" text="Publications" />
                <hr />
                {publications}
                <br />
            </div>
        );
    },
});


module.exports = PublicationsContainer;
