'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const awardsList = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        awards: PropTypes.array,
    },
    getDefaultProps: function() {
        return {
            awards: [],
        };
    },
    render: function() {
        const awards = [];
        let awardsContent = '';

        awards.push('Internal Awards');

        if (this.props.awards) {
            this.props.awards.forEach(function(content) {
                awards.push('<li>' + content + '</li>');
            });
        }
        awardsContent = awards.join(' ');
        return (
            <div className="text-awards">
                <div className="alert alert-info" dangerouslySetInnerHTML={{__html: awardsContent}} />
            </div>
        );
    },
});

module.exports = awardsList;
