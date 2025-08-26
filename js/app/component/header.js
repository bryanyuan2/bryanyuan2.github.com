import React from 'react';
import { PureRenderMixin } from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const Header = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        setID: PropTypes.string,
        text: PropTypes.string,
    },
    getDefaultProps: function() {
        return {
            setID: {},
            text: '',
        };
    },
    render: function() {
        const id = this.props.setID ? 'set-' + this.props.setID : 'set';
        return (
            <h2 className="text-section" id={id}>{this.props.text}</h2>
        );
    },
});

module.exports = Header;
