'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const pressList = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        press: PropTypes.array,
    },
    getDefaultProps: function() {
        return {
            press: [],
        };
    },
    render: function() {
        const press = [];
        let pressContent = '';

        if (this.props.press) {
            this.props.press.forEach(function(content) {
                press.push('<li><a target="_blank" rel="noopener noreferrer" href=' + content.link + '>' + content.title + ' - ' + content.source + '</a></li>');
            });
        }
        pressContent = press.join(' ');
        return (
            <div className="text-press">
                <div dangerouslySetInnerHTML={{__html: pressContent}} />
            </div>
        );
    },
});

module.exports = pressList;
