"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var awardsList = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        awards: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
          awards: {}
        };
    },
    render: function() {
        var awards = [];
        var awards_content = "";

        awards.push('Internal Awards');

        if (this.props.awards) {
          this.props.awards.forEach(function(content) {
            awards.push('<li>' + content + '</li>');
          });
        }
        awards_content = awards.join(" ");
        return (
            <div className="text-awards">
                <div className="alert alert-info" dangerouslySetInnerHTML={{__html: awards_content}} />
            </div>
        );
  }
});

module.exports = awardsList;