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
        let icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-bookmark-check-fill text-svg-twitter-blue" viewBox="0 0 16 16">' +
                '<path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>' +
              '</svg>';

        awards.push(icon + '<strong>Internal Awards</strong>');

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
