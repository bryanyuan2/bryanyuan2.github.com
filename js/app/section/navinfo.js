"use strict";

var _ = require('lodash'),
    $ = require('jquery'),
    React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    Typeahead = require('react-typeahead').Typeahead,
    SearchResult = require('./../search/searchresult'),
    config = require('./../config/env.json')[process.env.NODE_ENV || 'development'];

var SEARCH_CONF = {
    domain: config.SEARCH_API.DOMAIN + '/api/search/query/',
    header: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/javascript; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    opts: {
        limit: 10
    },
    timeout: 2000
};

var TYPEAHEAD_CONF = {
    cls: {
        input: 'tt-query search-box',
        results: 'tt-menu',
        listItem: 'tt-suggestion'
    },
    defaultClassNames: false,
    placeHolder: 'Search some keywords here ?',
    filterOpt: 'name',
    max: 10,
    highlight: true
};

var Contact = React.createClass({
    propTypes: {
        contact: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
            contact: {}
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return false;
    },
    render: function() {
        var getType = this.props.contact.type,
            cls = 'pivot ' + this.props.contact.cls;

        return (
            <a target="_blank" href={this.props.contact.link}>
                <span className={cls}>{getType}</span>
            </a>
        );
    }
});

var CompNavInfoContainer = React.createClass({
    mixins: [LoadJSON],
    getInitialState: function() {
        return {
            dd: {
                status: 'ok',
                target: 'default',
                intl: 'en',
                wiki: '',
                tag: []
            },
            algo: {
                status: 'ok',
                data: {}
            },
            query: ''
        };
    },
    updateDirectDisplay: function(item) {
        this.setState({
            dd: {
                status: 'ok',
                target: item.name,
                intl: item.intl,
                wiki: item.wiki,
                tag: item.tag
            }
        });
    },
    directDisplayOption: function(item) {
        return item.name;
    },
    onKeyDown: function(e) {
        if(e.which === 13) {
            this.setState({
                dd: {
                    status: 'ok'
                }
            });
        }
    },
    componentDidMount: function() {
        var that = this;

        $(".search-box").on('keydown', function(e) {
            if(e.which === 13) {
                var query = $("input").val(),
                    url = SEARCH_CONF.domain + encodeURI(query);

                console.log("search backend = ", url);
                
                $.ajax({
                    url: url,
                    data: SEARCH_CONF.opts,
                    headers: SEARCH_CONF.header,
                    timeout: SEARCH_CONF.timeout
                }).fail(function() {
                    that.setState({
                        algo: {
                            status: 'error'
                        },
                        query: query
                    });
                }).done(function(data) {
                    console.log('data', data);

                    if (data && data.result !== '0') {
                        that.setState({
                            algo: {
                                status: "ok",
                                data: data
                            },
                            query: query
                        });
                    } else {
                        that.setState({
                            algo: {
                                status: "error"
                            },
                            query: query
                        });   
                    }
                }.bind(that));
            }
        });
    },
    render: function() {

        /* search assist */
        var saAry = [],
            saData = (this.state.data && this.state.data[0]);

        console.log('saData', saData);
        for (var item in saData) {
            if(saData.hasOwnProperty(item)) {
                var target = saData[item],
                    en = _.get(target, ['wiki', 'en'], ''),
                    zh = _.get(target, ['wiki', 'zh'], ''),
                    name = _.get(target, ['name'], ''),
                    tag = _.get(target, ['tag'], '');

                if (name) {
                    saAry.push({
                        name: name,
                        tag: tag,
                        intl: en ? 'en' : 'zh',
                        wiki: en ? en : zh
                    });
                }
            }
        }

        /* contact */
        var contactData = this.state.subData && this.state.subData[0],
            contacts = [];
        for (var info in contactData) {
            if(contactData.hasOwnProperty(info)) {
                contacts.push(<Contact contact={contactData[info]} key={info} />);
            }
        }

        return(
            <div id="region-nav-info">
                <div className="row">
                    <div className="col-md-10">
                        <span id="region-searchBox">
                            <Typeahead customClasses={TYPEAHEAD_CONF.cls}
                                       placeholder={TYPEAHEAD_CONF.placeHolder}
                                       maxVisible={TYPEAHEAD_CONF.max}
                                       highlight={TYPEAHEAD_CONF.highlight}
                                       defaultClassNames={TYPEAHEAD_CONF.defaultClassNames}
                                       filterOption={TYPEAHEAD_CONF.filterOpt}
                                       options={saAry}
                                       displayOption={this.directDisplayOption}
                                       onKeyDown={this.onKeyDown}
                                       onOptionSelected={this.updateDirectDisplay} />
                        </span>
                        <div id="region-contacts">
                            <span className="row">{contacts}</span>
                        </div>
                    </div>
                </div>
                <div id="region-searchresult">
                    <div className="search-container">
                        <div className="algo">
                            <SearchResult status={this.state.algo.status}
                                          algo={this.state.algo.data}
                                          query={this.state.query}
                                          wiki={this.state.dd.wiki}
                                          intl={this.state.dd.intl}
                                          target={this.state.dd.target}
                                          tag={this.state.dd.tag} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CompNavInfoContainer;
