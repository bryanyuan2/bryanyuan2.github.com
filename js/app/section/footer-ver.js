'use strict';

const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

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
                <span className='footer-ver'><i>Ver.2025/6/23</i>. </span>
                Powered by
                {packages}
                <br />
            </div>
        );
    },
});

module.exports = FooterContainer;
