"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON,
    Typeahead = require('react-typeahead').Typeahead,
    truncate = require('truncate'),
    _ = require('lodash'),
    $ = require('jquery');

/* dd */
var wikiEnUrl = "https://en.wikipedia.org/wiki/",
    wikiZhUrl = "https://zh.wikipedia.org/wiki/",
    wikiDescEnUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    wikiDescZhUrl = "https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    wikiDescTrunc = 128,
    typeaheadClass = {
      input: 'tt-query search-box',
      results: 'tt-menu',
      listItem: 'tt-suggestion'
    },
    typeheadPlaceHolder = "Search some keywords here ?",
    wikiDDTagColor = "#55ACEE",
    blockedBorderHL = "#EEEEEE",
    blockedBorder = "border-left-color";


/* search */
var searchDomain = "http://localhost:8080/api/search/query/",
    searchHeader = {
      "Accept" : "application/json; charset=utf-8",
      "Content-Type": "application/javascript; charset=utf-8",
      "Access-Control-Allow-Origin" : "*"
    },
    searchOpts = {
      limit: 5
    };

var Contact = React.createClass({
  propTypes: {
    contact: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      contact: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    return (
        <a target="_blank" href={this.props.contact.link}>
          <img width={this.props.contact.width} height={this.props.contact.height} className="header_icons" src={this.props.contact.icon} alt={this.props.contact.type} />
        </a>
    );
  }
});

var DirectDisplayTag = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    hl: React.PropTypes.string
  },
  handleClick: function(event) {
    var hlAry = this.props.hl;
    var targetClass = event.target.id.replace("__", "");

    $("blockquote").css(blockedBorder, blockedBorderHL);

    for (var item in hlAry) {
      if (hlAry.hasOwnProperty(item)) {
        $("." + hlAry[item]).css(blockedBorder, wikiDDTagColor);
      }
    }

    $("body").animate({
      scrollTop: $("." + targetClass).offset().top
    }, 800);

  },
  render: function() {
    var text = this.props.text;
    var tags = [];
    var tags_content = "";
    for (var item in this.props.hl) {
      if(this.props.hl.hasOwnProperty(item)) {
        tags.push('<div class="ddAnchor" id="__' + this.props.hl[item] + '">' + text[item] + '</div>');
      }
    }
    tags_content = tags.join(" ");
    return (
      <span onClick={this.handleClick} className="dd-tags" dangerouslySetInnerHTML={{__html: tags_content}} />
    );
  }
});

var DirectDisplay = React.createClass({
  propTypes: {
    target: React.PropTypes.string,
    intl: React.PropTypes.string,
    wiki: React.PropTypes.string,
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
      target: "default",
      intl: "en",
      tag: {}
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.loading !== this.state.loading;
  },
  componentWillReceiveProps: function(nextProps) {
    var targetAbsUrl = nextProps.intl === 'en' ? wikiDescEnUrl: wikiDescZhUrl;
    targetAbsUrl = targetAbsUrl + encodeURIComponent(nextProps.target);

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
        wikiReadMoreUrl  = (this.props.intl === 'en') ? wikiEnUrl : wikiZhUrl,
        descTitle = (this.props.target !== "default") ? this.props.target : "";

    wikiReadMoreUrl = wikiReadMoreUrl + this.props.target;

    // get wiki description content
    if (this.state.ajaxContents.query && this.state.ajaxContents.query.pages) {
      var content = this.state.ajaxContents.query.pages;
      for (var element in content) {
        if (content[element].extract.length > wikiDescTrunc) {
          this.content = truncate(content[element].extract, wikiDescTrunc);
          descReadMore = "dd-read-more";
        } else {
          this.content = content[element].extract;
        }
      }
    }

    if (this.state.loading) {
      this.content = "";
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
          <DirectDisplayTag text={this.tags} hl={this.highlight} />
        </div>
      </div>
    );
  }
});


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
    //console.log("search result", this.props.result);
    var title = _.get(this.props, ['result', '_source', 'title'], ''),
        url = _.get(this.props, ['result', '_source', 'url'], '#'),
        content = _.get(this.props, ['result', '_source', 'content'], ''),
        abstract = content ? content.substr(0, 64) + ' ...' : '',
        media = _.get(this.props, ['result', '_source', 'media'], ''),
        mediaUrl = _.get(this.props, ['result', '_source', 'mediaUrl'], '#');

    return (
      <div className="search-item">
          <span className="title"><a target="_blank" href={url}>{title}</a></span>
          <span className="media"><a target="_blank" href={mediaUrl}>{media}</a></span>
          <span className="content">{abstract}</span>
      </div>
    );
  }
});

var ZRP = React.createClass({
  render: function() {
    return (
      <div className="zrp">
      </div>
    );
  }
});

var SearchResult = React.createClass({
  getInitialState: function() {
    return {
      result: {},
      isSearch: false
    };
  },
  propTypes: {
    // algo
    result: React.PropTypes.object,
    // dd
    target: React.PropTypes.string,
    intl: React.PropTypes.string,
    wiki: React.PropTypes.string,
    tag: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      result: {},
      target: "default",
      intl: "en",
      tag: {}
    };
  },
  componentWillReceiveProps: function(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({
      result: nextProps.result,
      isSearch: true
    });
  },
  render: function() {
    var algo = [],
        isZrp = true;

    if (this.props.wiki) {
      // dd
      algo.push(<DirectDisplay wiki={this.props.wiki} intl={this.props.intl} target={this.props.target} tag={this.props.tag}  />);
      isZrp = false;
    }

    // check this.state.result is not empty object
    if (Object.keys(this.state.result).length !== 0) {
      // algo
      this.state.result.forEach(function(result, index) {
        algo.push(<SearchResultBox result={result} key={index} />);
        isZrp = false;
      });
    }

    if (this.state.isSearch === true && isZrp){
      // zrp
      algo.push(<ZRP />);
    }

    return (
        <div>
          {algo}
        </div>
    );
  }
});

var CompNavInfoContainer = React.createClass({
  mixins: [LoadJSON],
  getInitialState: function() {
    return {
      target: "default",
      algo: {},
      tag: {}
    };
  },
  updateDirectDisplay: function(item) {
    this.setState({
      target: item.name,
      intl: item.intl,
      wiki: item.wiki,
      tag: item.tag
    }, function(){
      $(".search-btn").trigger("click");
    });
  },
  directDisplayOption: function(item) {
    return item.name;
  },
  componentDidMount: function() {
    var that = this;

    /* search box */
    $(".search-box").on('keydown', function(e) {
      if(e.which === 13) {
        $(".search-btn").trigger( "click" );
      }
    });

    $(".search-btn").click(function(){
      var url = searchDomain + encodeURIComponent($("input").val());
      console.log("search backend = ", url);
      $.ajax({
        url: url,
        data: searchOpts,
        headers: searchHeader
      }).done(function( algo ) {
        console.log("algo", algo);
        that.setState({
          algo: algo
        });
      }.bind(that));
    });
  },
  render: function() {

    /* search assist */
    var saAry = [],
        saData = this.state.data[0];

    for (var item in saData) {
      if(saData.hasOwnProperty(item)) {
        var saSubSet = {},
            target = saData[item],
            getWikiEn = _.get(target, ['wiki', 'en']),
            getWikiZh = _.get(target, ['wiki', 'zh']);

        saSubSet.name = _.get(target, ['name']);
        saSubSet.wiki = getWikiEn ? getWikiEn : getWikiZh;
        saSubSet.intl = getWikiEn ? "en" : "zh";
        saSubSet.tag = _.get(target, ['tag']);
        saAry.push(saSubSet);
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
          <div className="col-md-7">
            <span id="region-searchBox" className="ib">
              <Typeahead
                customClasses={typeaheadClass}
                defaultClassNames={false}
                placeholder={typeheadPlaceHolder}
                options={saAry}
                filterOption='name'
                displayOption={this.directDisplayOption}
                maxVisible={10}
                highlight={true}
                onOptionSelected={this.updateDirectDisplay} />
            </span>
            <span className="ib">
              <button type="button" id="nav-btn" className="btn search-btn">
                <span className="glyphicon glyphicon-search"></span>
                <span className="search-btn-text">Search</span>
              </button>
            </span>
            <div id="region-resume">
              <span>Download Curriculum vita <a target="_blank" href="https://github.com/bryanyuan2/bryanyuan2.resume/raw/master/ChengChunYuan_resume_v1.pdf">here</a></span>
            </div>
          </div>
          <div id="region-contacts" className="col-md-3">
            <span className="row header_icons_section">{contacts}</span>
          </div>
        </div>
        <hr />
        <div id="region-searchresult">
          <div className="search-container">
            <div className="algo">
              <SearchResult result={this.state.algo} wiki={this.state.wiki} intl={this.state.intl} target={this.state.target} tag={this.state.tag}  />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CompNavInfoContainer;
