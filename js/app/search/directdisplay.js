"use strict";

var React = require('react'),
    truncate = require('truncate'),
    $ = require('jquery');

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


var WIKI_CONST = {
    protocol: 'https',
    en: 'en.wikipedia.org',
    zh: 'zh.wikipedia.org',
    path: '/wiki',
    format: 'json',
    action: 'query',
    props: 'extracts'
};

var DD_SETTING = {
    descLength: 180,
    tagColor: '#55ACEE',
    borderColor: '#EEEEEE',
    borderStyle: 'border-left-color',
    scrollSpeed: 800,
    placeHolder: '__',
    readMoreCls: 'more'
}

var WIKI_URL = {
    enUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + WIKI_CONST.path + '/',
    zhUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.zh + WIKI_CONST.path + '/',
    enDescUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
    zhDescUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='
};

var DirectDisplay = createReactClass({
    propTypes: {
        target: PropTypes.string,
        intl: PropTypes.string,
        wiki: PropTypes.string,
        tag: PropTypes.array
    },
    tags: [],
    highlight: [],
    content: '',
    getInitialState: function() {
        return {
            loading: false,
            ajaxContents: ''
        };
    },
    getDefaultProps: function() {
        return {
            target: 'default',
            intl: 'en',
            tag: []
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.loading !== this.state.loading;
    },
    componentWillReceiveProps: function(nextProps) {
        var query = nextProps.target,
            host = (nextProps.intl === 'en' ? WIKI_URL.enDescUrl: WIKI_URL.zhDescUrl),
            targetAbsUrl = host + encodeURIComponent(query);

        if (query !== 'default') {
            /* blocked by loading */
            this.setState({loading: true}, function(){
                $.ajax({
                    url: targetAbsUrl,
                    dataType: 'jsonp'
                }).done(function(data) {
                    this.setState({
                        ajaxContents: data,
                        loading: false
                    });
                }.bind(this));
            });
        }
    },
    componentDidUpdate: function() {
        this.tags = [];
        this.highlight = [];
        for(var key in this.props.tag) {
            if(this.props.tag.hasOwnProperty(key)) {
                var target = this.props.tag[key],
                    name = target.name,
                    hl = target.hl;

                if (name) {
                    this.tags.push(name);
                    this.highlight.push(hl);
                }
            }
        }
    },
    render: function () {
        if (this.state.loading) {
            this.content = '';
        }

        var query = this.props.target,
            host  = (this.props.intl === 'en') ? WIKI_URL.enUrl : WIKI_URL.zhUrl,
            moreUrl = host + encodeURIComponent(query),
            descTitle = (query !== 'default') ? query : '';

        // get wiki description content
        var ajaxData = this.state.ajaxContents;
        if (ajaxData.query && ajaxData.query.pages) {
            var content = ajaxData.query.pages;
            for (var element in content) {
                if (content[element].extract) {
                    if (content[element].extract.length > DD_SETTING.descLength) {
                        this.content = truncate(content[element].extract, DD_SETTING.descLength);
                    } else {
                        this.content = content[element].extract;
                    }
                }
            }
        }

        return (
            <div className='dd'>
                <div className='showit'>
                    <h4>{descTitle}</h4>
                    {this.content}
                    <span className={DD_SETTING.readMoreCls}>
                        <a href={moreUrl} target='_blank'>Read more</a>
                    </span>
                    <h4>Related section(s)</h4>
                    <DDtag text={this.tags} highlight={this.highlight} />
                </div>
            </div>
        );
        
    }
});

var DDtag = createReactClass({
    propTypes: {
        text: PropTypes.array,
        highlight: PropTypes.array
    },
    handleClick: function(event) {
        var hlAry = this.props.highlight,
            targetClass = event.target.id.replace(DD_SETTING.placeHolder, '');

        $('blockquote').css(DD_SETTING.borderStyle, DD_SETTING.borderColor);

        for (var item in hlAry) {
            if (hlAry.hasOwnProperty(item)) {
                $('.' + hlAry[item]).css(DD_SETTING.borderStyle, DD_SETTING.tagColor);
            }
        }

        $('body').animate({
            scrollTop: $('.' + targetClass).offset().top
        }, DD_SETTING.scrollSpeed);
    },
    render: function() {
        var text = this.props.text,
            tags = [],
            tagSet = '';

        for (var item in this.props.highlight) {
            if(this.props.highlight.hasOwnProperty(item)) {
                if (text[item]) {
                    tags.push('<div class="ddAnchor" id="' + DD_SETTING.placeHolder + this.props.highlight[item] + '">' + text[item] + '</div>');
                }
            }
        }
        tagSet = tags.join(' ');

        return (
            <span onClick={this.handleClick} className='dd-tags' dangerouslySetInnerHTML={{__html: tagSet}} />
        );
    }
});

module.exports = DirectDisplay;


