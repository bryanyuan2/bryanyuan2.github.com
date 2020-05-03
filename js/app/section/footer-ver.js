"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON;

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var Pack = createReactClass({
    propTypes: {
        items: PropTypes.object,
        key: PropTypes.number
    },
    getDefaultProps: function() {
        return {
            items: {},
            key: 0
        };
    },
    shouldComponentUpdate: function() {
        // shouldComponentUpdate: function(nextProps, nextState)
        return false;
    },
    render: function() {
        return (
            <a target="_blank" href={this.props.items.url}><img className="footer-img" src={this.props.items.img} /></a>
        );
    }
});

var FooterContainer = createReactClass({
    mixins: [LoadJSON],
    propTypes: {
        data: PropTypes.array
    },
    render: function() {
        var packages = [];
        this.state.data.forEach(function(item, index) {
          packages.push(<Pack items={item} key={index} />);
        });
        return(
          <div id='region-footer'>
                <hr />
                <span className='footer-ver'><i>Ver.2020/5/3</i>. </span>
                Powered by 
                {packages}
                <br />
          </div>
        );
    }
});

module.exports = FooterContainer;
