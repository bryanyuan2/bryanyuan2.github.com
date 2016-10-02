"use strict";

var React = require('react'),
    truncate = require('truncate'),
    _ = require('lodash'),
    $ = require('jquery'),
    DirectDisplay = require('./directdisplay');

var SearchResultBox = React.createClass({
  propTypes: {
    result: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      result: {}
    };
  },
  render: function() {
    // console.log("this.props.result", this.props.result);
    var title = _.get(this.props, ['result', 'title'], ''),
        url = _.get(this.props, ['result', 'url'], '#'),
        description = _.get(this.props, ['result', 'description'], ''),
        abstract = description ? description.substr(0, 64) + ' ...' : '',
        media = _.get(this.props, ['result', 'media'], ''),
        mediaUrl = _.get(this.props, ['result', 'mediaUrl'], '#');

    return (
      <div className="search-item">
          <span className="title"><a target="_blank" href={url}>{title}</a></span>
          <span className="media"><a target="_blank" href={mediaUrl}>{media}</a></span>
          <span className="content">{abstract}</span>
      </div>
    );
  }
});

var NavBox = React.createClass({
  propTypes: {
    arrow: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      arrow: ""
    };
  },
  render: function() {
    var classType = "box box" + this.props.arrow;
    return (
      <div className={classType}></div>
    );
  }
});

var ZRP = React.createClass({
  render: function() {
    return (
      <div className="zrp">no article was found</div>
    );
  }
});

var SearchResult = React.createClass({
  getInitialState: function() {
    return {
      result: {},
      searchAction: false
    };
  },
  propTypes: {
    algoResult: React.PropTypes.object,
    algoStatus: React.PropTypes.string,
    ddTarget: React.PropTypes.string,
    ddIntl: React.PropTypes.string,
    ddWiki: React.PropTypes.string,
    ddTag: React.PropTypes.object,
    ddStatus: React.PropTypes.string,
    query: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      algoResult: {},
      ddTrget: "default",
      ddIntl: "en",
      ddTag: {},
      algoStatus: "ok",
      query: ""
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // console.log("nextProps", nextProps);
    this.setState({
      result: nextProps.algoResult,
      searchAction: true
    });
  },
  render: function() {
    var algo = [],
        isZrp = true,
        wikiLength = 0;
    var showWiki = (this.props.ddWiki);
    var algoLength = Object.keys(this.state.result).length ? Object.keys(this.state.result).length : 0;
    var ddConf = {
      "size": (algoLength === 0) ? "fit" : "origin"
    };

    // wiki
    if (showWiki) {
      algo.push(<DirectDisplay conf={ddConf} wiki={this.props.ddWiki} intl={this.props.ddIntl} target={this.props.ddTarget} tag={this.props.ddTag} status={this.props.ddStatus} />);
      isZrp = false;
      wikiLength = 2;
    }

    // algo
    if (algoLength !== 0) {
      this.state.result.forEach(function(result, index) {
        algo.push(<SearchResultBox result={result} key={index} />);
        isZrp = false;
      });
    }

    // navigation
    /*if (algoLength + wikiLength > 5) {
      algo.push(<NavBox arrow="Prev" />);
      algo.push(<NavBox arrow="Next" />);
    }*/

    // zrp
    if (this.props.query !== '' &&
        this.props.algoStatus !== 'error' &&
        this.state.searchAction === true &&
        Object.keys(this.props.algoResult).length === 0) {
      //algo.push(<ZRP query={this.props.query} />);
      algo.push(<ErrorHandler query={this.props.query} type="zrp" />);
    }

    // error
    if (this.props.algoStatus === 'error') {
      algo.push(<ErrorHandler query={this.props.query} type="404" />);
    }

    return (<div>{algo}</div>);
  }
});

var ErrorHandler = React.createClass({
  propTypes: {
    query: React.PropTypes.string,
    type: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      query: "default",
      type: "error"
    };
  },
  render: function() {
    var title;
    var hint = "Please try it again or another query term";
    console.log("log", this.props.type);
    if (this.props.type === 'zrp') {
      title = "No result is found !";
    } else {
      title = "Sorry, we encountered API issue";
    }

    return (
      <div className="search-item">
        <div className="search-error">{title}</div>
        <div className="search-hint">{hint}</div>
      </div>
    );
  }
});

module.exports = SearchResult;
