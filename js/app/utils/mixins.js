'use strict';

const $ = require('jquery');

const PropTypes = require('prop-types');

const Mixins = {
    LoadJSON: {
        propTypes: function() {
            url: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.array,
            ]);
        },
        getInitialState: function() {
            return {
                data: [],
                dataSub: [],
            };
        },
        loadData: function() {
            const that = this;
            if (typeof(this.props.url) === 'string') {
                $.getJSON(this.props.url, function(data) {
                    that.setState({data: data});
                });
            } else if (typeof(this.props.url) === 'object') {
                const ajax = [];
                for (const item in this.props.url) {
                    if (this.props.url.hasOwnProperty(item)) {
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
        },
    },
};

module.exports = Mixins;
