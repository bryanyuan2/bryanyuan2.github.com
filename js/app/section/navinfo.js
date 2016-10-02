"use strict";

var React = require('react'),
    LoadJSON = require('./../utils/mixins').LoadJSON,
    Typeahead = require('react-typeahead').Typeahead,
    _ = require('lodash'),
    $ = require('jquery'),
    SearchResult = require('./../search/searchresult'),
    config = require('./../config/env.json')[process.env.NODE_ENV || 'development'];

var algoObj = {
  "searchDomain": config.SEARCH_API.DOMAIN + "/api/search/query/",
  "searchHeader": {
      "Accept" : "application/json; charset=utf-8",
      "Content-Type": "application/javascript; charset=utf-8",
      "Access-Control-Allow-Origin" : "*"
    },
  "searchOpts": {
      "limit": 10
  },
  "searchTimeout": 2000
};

var FaPaperPlane = require('react-icons/lib/fa/paper-plane'),
    FaGithub = require('react-icons/lib/fa/github'),
    FaLinkedin = require('react-icons/lib/fa/linkedin'),
    FaFacebook = require('react-icons/lib/fa/facebook'),
    FaFlickr = require('react-icons/lib/fa/flickr'),
    FaBookmark = require('react-icons/lib/fa/bookmark');

/* typeahead */
var typeaheadClass = {
      input: 'tt-query search-box',
      results: 'tt-menu',
      listItem: 'tt-suggestion'
    },
    typeheadPlaceHolder = "Search some keywords here ?";

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
    var getType = this.props.contact.type,
        btn;

    if (getType === 'email') {
      btn = <FaPaperPlane size="18" />;
    } else if (getType === 'linkedin') {
      btn = <FaLinkedin size="18" />;
    } else if (getType === 'github') {
      btn = <FaGithub size="18" />;
    } else if (getType === 'facebook') {
      btn = <FaFacebook size="18" />;
    } else if (getType === 'flickr') {
      btn = <FaFlickr size="18" />;
    } else if (getType === 'bookmarks') {
      btn = <FaBookmark size="18" />;
    } 

    return (
        <a target="_blank" href={this.props.contact.link}>
          <button type="button" className={this.props.contact.cls} >{btn} {getType}</button>
        </a>
    );
  }
});

var CompNavInfoContainer = React.createClass({
  mixins: [LoadJSON],
  getInitialState: function() {
    return {
      ddStatus: 'ok',
      ddTarget: "default",
      ddTag: {},
      algo: {},
      algoStatus: "ok"
    };
  },
  updateDirectDisplay: function(item) {
    console.log("item", item);
    this.setState({
      ddStatus: 'ok',
      ddTarget: item.name,
      ddIntl: item.intl,
      ddWiki: item.wiki,
      ddTag: item.tag
    }, function(){
      $(".search-btn").trigger("click");
    });
  },
  directDisplayOption: function(item) {
    return item.name;
  },
  onKeyDown: function(e) {
    if(e.which === 13) {
        console.log("on key down");
        this.setState({
          ddStatus: 'ok'
        }, function(){
          $(".search-btn").trigger("click");
        });
      }
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
      console.log("input", $("input").val());
      var url = algoObj.searchDomain + encodeURI($("input").val());
      console.log("search backend = ", url);
      $.ajax({
        url: url,
        data: algoObj.searchOpts,
        headers: algoObj.searchHeader,
        timeout: algoObj.searchTimeout
      }).fail(function() {
        that.setState({
          algoStatus: "error",
          query: $("input").val()
        });
      }).done(function( algo ) {
        console.log("algo", algo);
        that.setState({
          query: $("input").val(),
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
        var target = saData[item],
            getWikiEn = _.get(target, ['wiki', 'en']),
            getWikiZh = _.get(target, ['wiki', 'zh']);

        saAry.push({
          "name": _.get(target, ['name']),
          "wiki": getWikiEn ? getWikiEn : getWikiZh,
          "intl": getWikiEn ? "en" : "zh",
          "tag": _.get(target, ['tag'])
        });
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
          <div id="region-contacts" className="col-md-10">
            <span className="row header_icons_section">{contacts}</span>
          </div>
          <div className="col-md-5">
            <span id="region-searchBox" className="ib">
              <Typeahead customClasses={typeaheadClass}
                         defaultClassNames={false}
                         placeholder={typeheadPlaceHolder}
                         options={saAry}
                         filterOption='name'
                         displayOption={this.directDisplayOption}
                         maxVisible={10}
                         highlight={true}
                         onKeyDown={this.onKeyDown}
                         onOptionSelected={this.updateDirectDisplay}
                         />
            </span>
            <span className="ib">
              <button type="button" id="nav-btn" className="btn search-btn">
                <span className="glyphicon glyphicon-search"></span>
                <span className="search-btn-text">Search</span>
              </button>
            </span>
            <div id="region-resume">
              <span><i className="set-icon glyphicon glyphicon-tag"></i>
                Download my resume <a target="_blank" href="https://github.com/bryanyuan2/bryanyuan2.resume/raw/master/ChengChunYuan_resume_v1.pdf">here</a>
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div id="region-searchresult">
          <div className="search-container">
            <div className="algo">
              <SearchResult algoStatus={this.state.algoStatus}
                            algoResult={this.state.algo}
                            query={this.state.query}
                            ddWiki={this.state.ddWiki}
                            ddIntl={this.state.ddIntl}
                            ddTarget={this.state.ddTarget}
                            ddTag={this.state.ddTag}
                            ddStatus={this.state.ddStatus}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CompNavInfoContainer;
