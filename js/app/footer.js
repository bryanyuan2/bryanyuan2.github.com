"use strict";

var React = require('react'),
    LoadJSON = require('./mixins').LoadJSON;

var Pack = React.createClass({
  propTypes: {
    items: React.PropTypes.object,
    key: React.PropTypes.number
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
      <a target="_blank" href={this.props.items.url}><img className="footerImg" src={this.props.items.img} /></a>
    );
  }
});

var FooterContainer = React.createClass({
  mixins: [LoadJSON],
  propTypes: {
    data: React.PropTypes.array
  },
  render: function() {
    var packages = [];
    this.state.data.forEach(function(item, index) {
      packages.push(<Pack items={item} key={index} />);
    });
    return(
      <div id='regionFooter'>
            <hr />
            <span className='footerVer'><i>Ver.%ver_replacement%</i>. </span>
            Powered by 
            {packages}
            <br />
      </div>
    );
  }
});

module.exports = FooterContainer;
