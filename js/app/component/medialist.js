"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var mediaList = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        media: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
          media: {}
        };
    },
    render: function() {
        var media = [];
        var media_content = "";

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