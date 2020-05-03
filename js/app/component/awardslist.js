"use strict";

var React = require('react'),
    PureRenderMixin = require('react-addons-pure-render-mixin');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


var awardsList = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        awards: PropTypes.array
    },
    getDefaultProps: function() {
        return {
            awards: []
        };
    },
    render: function() {
        var awards = [],
            awards_content = "";

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