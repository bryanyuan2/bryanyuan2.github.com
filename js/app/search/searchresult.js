"use strict";

var React = require('react'),
    _ = require('lodash'),
    DirectDisplay = require('./directdisplay');

var I18N_CONF = {
    zrp: {
        title: 'No result is found !',
        hint: 'Please try it again or another query term'
    },
    error: {
        title: 'Sorry, we encountered API issue',
        hint: 'Please try it again or another query term'
    }
};

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

var SearchResult = React.createClass({
    getInitialState: function() {
        return {
            result: {},
            searchAction: false
        };
    },
    propTypes: {
        query: React.PropTypes.string,
        target: React.PropTypes.string,
        intl: React.PropTypes.string,
        tag: React.PropTypes.array,
        wiki: React.PropTypes.string,
        algo: React.PropTypes.object,
        status: React.PropTypes.string,
        key: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            query: '',
            target: 'default',
            intl: 'en',
            tag: [],
            wiki: '',
            algo: {},
            status: 'ok',
            key: 0
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            result: nextProps.algo,
            searchAction: true
        });
    },
    render: function() {
        var algo = [],
            wiki = this.props.wiki;

        // wiki
        if (wiki) {
            algo.push(<DirectDisplay wiki={this.props.wiki} intl={this.props.intl} target={this.props.target} tag={this.props.tag} />);
        }

        // algo
        if (Object.keys(this.state.result).length) {
            this.state.result.forEach(function(result, index) {
                algo.push(<SearchResultBox result={result} key={index} />);
            });
        } else if (this.props.query !== '' &&
            this.props.status !== 'error' &&
            this.state.searchAction === true &&
            Object.keys(this.props.algo).length === 0) {
            // zrp
            algo.push(<ErrorHandler query={this.props.query} type="zrp" />);
        } else if (this.props.status === 'error') {
            // error
            algo.push(<ErrorHandler query={this.props.query} type="404" />);
        }

        return (
            <div>{algo}</div>
        );
    }
});

var ErrorHandler = React.createClass({
    propTypes: {
        query: React.PropTypes.string,
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            query: 'default',
            type: 'error'
        };
    },
    render: function() {
        var title = '',
            hint = '';
        if (this.props.type === 'zrp') {
            title = I18N_CONF.zrp.title;
            hint = I18N_CONF.zrp.hint;
        } else {
            title = I18N_CONF.error.title;
            hint = I18N_CONF.error.hint;
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
