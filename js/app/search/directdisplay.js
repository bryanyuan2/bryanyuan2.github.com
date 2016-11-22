"use strict";

var React = require('react'),
    truncate = require('truncate'),
    $ = require('jquery');

var wikiObj = {
    enUrl: "https://en.wikipedia.org/wiki/",
    zhUrl: "https://zh.wikipedia.org/wiki/",
    enDescUrl: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    zhDescUrl: "https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    descLength: 128,
    tagColor: "#55ACEE",
    borderColor: "#EEEEEE",
    borderStyle: "border-left-color",
    scrollSpeed: 800
};

var DirectDisplay = React.createClass({
  propTypes: {
    target: React.PropTypes.string,
    intl: React.PropTypes.string,
    wiki: React.PropTypes.string,
    status: React.PropTypes.string,
    tag: React.PropTypes.object
  },
  tags: [],
  highlight: [],
  content: "",
  getInitialState: function() {
    return {
      loading: false,
      ajaxContents: ""
    };
  },
  getDefaultProps: function() {
    return {
      status: "ok",
      target: "default",
      intl: "en",
      tag: {}
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.loading !== this.state.loading;
  },
  componentWillReceiveProps: function(nextProps) {
    var targetAbsUrl = (nextProps.intl === 'en' ? wikiObj.enDescUrl: wikiObj.zhDescUrl) + encodeURIComponent(nextProps.target);

    if (nextProps.target !== 'default') {
      /* blocked by loading */
      this.setState({ loading: true }, function(){
        $.ajax({
          url: targetAbsUrl,
          dataType: "jsonp"
        }).done(function( descResult ) {
          this.setState({ ajaxContents: descResult, loading: false });
        }.bind(this));
      });
    }
  },
  componentDidUpdate: function() {
    this.tags = [];
    this.highlight = [];
    for(var key in this.props.tag) {
      if(this.props.tag.hasOwnProperty(key)) {
          this.tags.push(this.props.tag[key].name);
          this.highlight.push(this.props.tag[key].hl);
      }
    }
  },
  render: function () {
    var descReadMore = "eleHidden",
        wikiReadMoreUrl  = (this.props.intl === 'en') ? wikiObj.enUrl : wikiObj.zhUrl,
        descTitle = (this.props.target !== "default") ? this.props.target : "";

    wikiReadMoreUrl = wikiReadMoreUrl + this.props.target;

    // get wiki description content
    if (this.state.ajaxContents.query && this.state.ajaxContents.query.pages) {
      var content = this.state.ajaxContents.query.pages;
      for (var element in content) {
        if (content[element].extract.length > wikiObj.descLength) {
          this.content = truncate(content[element].extract, wikiObj.descLength);
          descReadMore = "dd-read-more";
        } else {
          this.content = content[element].extract;
        }
      }
    }

    if (this.state.loading) {
      this.content = "";
    }

    if (this.props.status === 'error') {
      console.log("dd error");
      return '<div>nonono</div>';
    }
    return (
      <div className="dd">
        <div className="showit">
          <h4>{descTitle}</h4>
          {this.content}
          <span className={descReadMore}>
            <a href={wikiReadMoreUrl} target="_blank">Read more</a>
          </span>
          <h4>Related section(s)</h4>
          <DDtag text={this.tags} highlight={this.highlight} />
        </div>
      </div>
    );
  }
});


var DDtag = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    highlight: React.PropTypes.object
  },
  handleClick: function(event) {
    console.log("event", event);
    var hlAry = this.props.highlight;
    var targetClass = event.target.id.replace("__", "");

    $("blockquote").css(wikiObj.borderStyle, wikiObj.borderColor);

    for (var item in hlAry) {
      if (hlAry.hasOwnProperty(item)) {
        $("." + hlAry[item]).css(wikiObj.borderStyle, wikiObj.tagColor);
      }
    }

    $("body").animate({
      scrollTop: $("." + targetClass).offset().top
    }, wikiObj.scrollSpeed);
  },
  render: function() {
    var text = this.props.text;
    var tags = [];
    var tagSet = "";
    for (var item in this.props.highlight) {
      if(this.props.highlight.hasOwnProperty(item)) {
        tags.push('<div class="ddAnchor" id="__' + this.props.highlight[item] + '">' + text[item] + '</div>');
      }
    }
    tagSet = tags.join(" ");
    return (
      <span onClick={this.handleClick} className="dd-tags" dangerouslySetInnerHTML={{__html: tagSet}} />
    );
  }
});

module.exports = DirectDisplay;


