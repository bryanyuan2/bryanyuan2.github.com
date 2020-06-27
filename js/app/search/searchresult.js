'use strict';

const React = require('react');
const _ = require('lodash');
const DirectDisplay = require('./directdisplay');


const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const I18N_CONF = {
    zrp: {
        title: 'No result is found !',
        hint: 'Please try it again or another query term',
    },
    error: {
        title: 'Sorry, we encountered API issue',
        hint: 'Please try it again or another query term',
    },
};

const SearchResultBox = createReactClass({
    propTypes: {
        result: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            result: {},
        };
    },

    render: function() {
        const title = _.get(this.props, ['result', 'title'], '');
        const url = _.get(this.props, ['result', 'url'], '#');
        const description = _.get(this.props, ['result', 'description'], '');
        const abstract = description ? description.substr(0, 64) + ' ...' : '';
        const media = _.get(this.props, ['result', 'media'], '');
        const mediaUrl = _.get(this.props, ['result', 'mediaUrl'], '#');

        return (
            <div className="search-item">
                <span className="title"><a target="_blank" rel="noopener noreferrer" href={url}>{title}</a></span>
                <span className="media"><a target="_blank" rel="noopener noreferrer" href={mediaUrl}>{media}</a></span>
                <span className="content">{abstract}</span>
            </div>
        );
    },
});

const SearchResult = createReactClass({
    getInitialState: function() {
        return {
            result: {},
            searchAction: false,
        };
    },
    propTypes: {
        query: PropTypes.string,
        target: PropTypes.string,
        intl: PropTypes.string,
        tag: PropTypes.array,
        wiki: PropTypes.string,
        algo: PropTypes.object,
        status: PropTypes.string,
        key: PropTypes.number,
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
            key: 0,
        };
    },
    UNSAFE_componentWillReceiveProps: function(nextProps) {
        this.setState({
            result: nextProps.algo,
            searchAction: true,
        });
    },
    render: function() {
        const algo = [];
        const wiki = this.props.wiki;

        // wiki
        if (wiki) {
            algo.push(<DirectDisplay wiki={this.props.wiki} intl={this.props.intl} target={this.props.target} tag={this.props.tag} />);
        }

        // algo
        if (this.props.query === '') {
            // default, do nothing
        } else if (Object.keys(this.state.result).length) {
            // algo
            this.state.result.forEach(function(result, index) {
                algo.push(<SearchResultBox result={result} key={index} />);
            });
        } else if (this.props.query !== '' &&
            this.props.status !== 'error' &&
            this.state.searchAction === true &&
            Object.keys(this.props.algo).length === 0) {
            // zrp
            algo.push(<ErrorHandler query={this.props.query} type="zrp" />);
        } else {
            algo.push(<ErrorHandler query={this.props.query} type="zrp" />);
        }

        return (
            <div>{algo}</div>
        );
    },
});

const ErrorHandler = createReactClass({
    propTypes: {
        query: PropTypes.string,
        type: PropTypes.string,
    },
    getDefaultProps: function() {
        return {
            query: 'default',
            type: 'error',
        };
    },
    render: function() {
        let title = '';
        let hint = '';
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
    },
});

module.exports = SearchResult;
