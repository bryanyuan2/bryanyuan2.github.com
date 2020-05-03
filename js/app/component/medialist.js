"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


var mediaList = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        media: PropTypes.array
    },
    getDefaultProps: function() {
        return {
            media: []
        };
    },
    render: function() {
        var media = [],
            media_content = "";

        if (this.props.media) {
            this.props.media.forEach(function(content) {
                media.push('<li><a target="_blank" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
             });
        }
        media_content = media.join(" ");
        return (
            <div className="text-media">
                <div dangerouslySetInnerHTML={{__html: media_content}} />
            </div>
        );
  }
});

module.exports = mediaList;