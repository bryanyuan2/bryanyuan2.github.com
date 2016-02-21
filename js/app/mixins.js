"use strict";

var React = require('react');

var Mixins = {
  LoadJSON : {
    propTypes: function() {
      url: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array
      ]);
    },
    getInitialState: function() {
      return {
        data: [],
        dataSub: []
      };
    },
    loadData: function() {
      var that = this;
      if (typeof(this.props.url) === 'string') {
        $.getJSON(this.props.url, function(data) {
          that.setState({data: data});
        });
      } else if (typeof(this.props.url) === 'object') {
        var ajax = [];
        for (var item in this.props.url) {
          if(this.props.url.hasOwnProperty(item)) {
            ajax.push($.getJSON(this.props.url[item]));
          }
        }
        $.when.apply($, ajax).then(function(data, subData, triData) {
          if (arguments.length === 1) {
            that.setState({data: data});
          } else if (arguments.length === 2) {
            that.setState({data: data, subData: subData});
          } else if (arguments.length === 3) {
            that.setState({data: data, subData: subData, triData: triData});
          }
        });
      }
    },
    componentDidMount: function() {
        this.loadData();
    }
  }
};

module.exports = Mixins;
