'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const createReactClass = require('create-react-class');

const TeamworkContainer = createReactClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <span className="label label-info label-teamwork">Teamwork</span>
        );
    },
});

module.exports = TeamworkContainer;
