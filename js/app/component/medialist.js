'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');


const mediaList = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        media: PropTypes.array,
    },
    getDefaultProps: function() {
        return {
            media: [],
        };
    },
    render: function() {
        const media = [];
        let mediaContent = '';

        if (this.props.media) {
            this.props.media.forEach(function(content) {
                media.push('<li><a target="_blank" rel="noopener noreferrer" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
            });
        }
        mediaContent = media.join(' ');
        return (
            <div className="text-media">
                <div dangerouslySetInnerHTML={{__html: mediaContent}} />
            </div>
        );
    },
});

module.exports = mediaList;
