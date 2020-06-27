'use strict';

const React = require('react');
const truncate = require('truncate');
const $ = require('jquery');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');


const WIKI_CONST = {
    protocol: 'https',
    en: 'en.wikipedia.org',
    zh: 'zh.wikipedia.org',
    path: '/wiki',
    format: 'json',
    action: 'query',
    props: 'extracts',
};

const DD_SETTING = {
    descLength: 180,
    tagColor: '#55ACEE',
    borderColor: '#EEEEEE',
    borderStyle: 'border-left-color',
    scrollSpeed: 800,
    placeHolder: '__',
    readMoreCls: 'more',
};

const WIKI_URL = {
    enUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + WIKI_CONST.path + '/',
    zhUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.zh + WIKI_CONST.path + '/',
    enDescUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
    zhDescUrl: WIKI_CONST.protocol + '://' + WIKI_CONST.en + '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
};

const DirectDisplay = createReactClass({
    propTypes: {
        target: PropTypes.string,
        intl: PropTypes.string,
        wiki: PropTypes.string,
        tag: PropTypes.array,
    },
    tags: [],
    highlight: [],
    content: '',
    getInitialState: function() {
        return {
            loading: false,
            ajaxContents: '',
        };
    },
    getDefaultProps: function() {
        return {
            target: 'default',
            intl: 'en',
            tag: [],
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.loading !== this.state.loading;
    },
    UNSAFE_componentWillReceiveProps: function(nextProps) {
        const query = nextProps.target;
        const host = (nextProps.intl === 'en' ? WIKI_URL.enDescUrl: WIKI_URL.zhDescUrl);
        const targetAbsUrl = host + encodeURIComponent(query);

        if (query !== 'default') {
            /* blocked by loading */
            const self = this;
            this.setState({loading: true}, function() {
                $.ajax({
                    url: targetAbsUrl,
                    dataType: 'jsonp',
                }).done(function(data) {
                    self.setState({
                        ajaxContents: data,
                        loading: false,
                    });
                });
            });
        }
    },
    componentDidUpdate: function() {
        this.tags = [];
        this.highlight = [];
        for (const key in this.props.tag) {
            if (this.props.tag.hasOwnProperty(key)) {
                const target = this.props.tag[key];
                const name = target.name;
                const hl = target.hl;

                if (name) {
                    this.tags.push(name);
                    this.highlight.push(hl);
                }
            }
        }
    },
    render: function() {
        if (this.state.loading) {
            this.content = '';
        }

        const query = this.props.target;
        const host = (this.props.intl === 'en') ? WIKI_URL.enUrl : WIKI_URL.zhUrl;
        const moreUrl = host + encodeURIComponent(query);
        const descTitle = (query !== 'default') ? query : '';

        // get wiki description content
        const ajaxData = this.state.ajaxContents;
        if (ajaxData.query && ajaxData.query.pages) {
            const content = ajaxData.query.pages;
            for (const element in content) {
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
                        <a href={moreUrl} target='_blank rel="noopener noreferrer"'>Read more</a>
                    </span>
                    <h4>Related section(s)</h4>
                    <DDtag text={this.tags} highlight={this.highlight} />
                </div>
            </div>
        );
    },
});

const DDtag = createReactClass({
    propTypes: {
        text: PropTypes.array,
        highlight: PropTypes.array,
    },
    handleClick: function(event) {
        const hlAry = this.props.highlight;
        const targetClass = event.target.id.replace(DD_SETTING.placeHolder, '');

        $('blockquote').css(DD_SETTING.borderStyle, DD_SETTING.borderColor);

        for (const item in hlAry) {
            if (hlAry.hasOwnProperty(item)) {
                $('.' + hlAry[item]).css(DD_SETTING.borderStyle, DD_SETTING.tagColor);
            }
        }

        $('body').animate({
            scrollTop: $('.' + targetClass).offset().top,
        }, DD_SETTING.scrollSpeed);
    },
    render: function() {
        const text = this.props.text;
        const tags = [];
        let tagSet = '';

        for (const item in this.props.highlight) {
            if (this.props.highlight.hasOwnProperty(item)) {
                if (text[item]) {
                    tags.push('<div class="ddAnchor" id="' + DD_SETTING.placeHolder + this.props.highlight[item] + '">' + text[item] + '</div>');
                }
            }
        }
        tagSet = tags.join(' ');

        return (
            <span onClick={this.handleClick} className='dd-tags' dangerouslySetInnerHTML={{__html: tagSet}} />
        );
    },
});

module.exports = DirectDisplay;


