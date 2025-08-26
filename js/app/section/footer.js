import React from 'react';
import { LoadJSON } from './../utils/mixins';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const Pack = createReactClass({
    propTypes: {
        items: PropTypes.object
    },
    getDefaultProps: function() {
        return {
            items: {}
        };
    },
    shouldComponentUpdate: function() {
        // shouldComponentUpdate: function(nextProps, nextState)
        return false;
    },
    render: function() {
        return (
            <a target="_blank" rel="noopener noreferrer" href={this.props.items.url}><img className="footer-img" src={this.props.items.img} /></a>
        );
    },
});

const FooterContainer = createReactClass({
    mixins: [LoadJSON],
    propTypes: {
        data: PropTypes.array,
    },
    render: function() {
        const packages = [];
        this.state.data.forEach(function(item, index) {
            // need to keep key={index} to avoid the following warning
            // warning: Each child in a list should have a unique "key" prop.
            packages.push(<Pack items={item} key={index} />);
        });
        return (
            <div id='region-footer'>
                <hr />
                Powered by
                {packages}
                <br />
            </div>
        );
    },
});

export default FooterContainer;
