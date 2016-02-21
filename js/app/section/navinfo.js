"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON,
    Typeahead = require('react-typeahead').Typeahead,
    truncate = require('truncate');

var wikiEnUrl = "https://en.wikipedia.org/wiki/",
    wikiZhUrl = "https://zh.wikipedia.org/wiki/",
    wikiDescEnUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    wikiDescZhUrl = "https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
    wikiDescTrunc = 512,
    typeaheadClass = {
      input: 'tt-query searchBox',
      results: 'tt-menu',
      listItem: 'tt-suggestion'
    },
    typeheadPlaceHolder = "Search some keywords, dude ? ",
    wikiDDTagColor = "#4099FF",
    blockedBorderHL = "#EEEEEE",
    blockedBorder = "border-left-color";

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
    }, 800, 'easeInOutQuad');

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
      <span onClick={this.handleClick} className="DDtags" dangerouslySetInnerHTML={{__html: tags_content}} />
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
  ddTags: [],
  ddHl: [],
  descContent: "",
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
      $(".showit").hide();
      this.setState({ loading: true }, function(){
        $.ajax({
          url: targetAbsUrl,
          dataType: "jsonp"
        }).done(function( descResult ) {
          this.setState({ ajaxContents: descResult, loading: false });
          $(".showit").fadeIn();
        }.bind(this));
      });
    }
  },
  componentWillUpdate: function() {
    $(".directDisplayContent").show();
  },
  componentDidUpdate: function() {
    this.ddTags = [];
    this.ddHl = [];
    for(var key in this.props.tag) {
      if(this.props.tag.hasOwnProperty(key)) {
          this.ddTags.push(this.props.tag[key].name);
          this.ddHl.push(this.props.tag[key].hl);
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
          this.descContent = truncate(content[element].extract, wikiDescTrunc);
          descReadMore = "eleShow";
        } else {
          this.descContent = content[element].extract;
        }
      }
    }

    if (this.state.loading) {
      this.descContent = "";
    }
    return (
      <div className="directDisplayContent">
        <div className="loadingShowCls showit">
          <h4>{descTitle}</h4>
          {this.descContent}
          <span className={descReadMore}>
            <a href={wikiReadMoreUrl} target="_blank">Read more</a>
          </span>
          <h4>Related section(s)</h4>
          <DirectDisplayTag text={this.ddTags} hl={this.ddHl} />
        </div>
      </div>
    );
  }
});


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

var CompNavInfoContainer = React.createClass({
  mixins: [LoadJSON],
  getInitialState: function() {
    return {
      target: "default",
      tag: {}
    };
  },
  updateDirectDisplay: function(item) {
    this.setState({
      target: item.name,
      intl: item.intl,
      wiki: item.wiki,
      tag: item.tag
    });
  },
  directDisplayOption: function(item) {
    return item.name;
  },
  componentDidMount: function() {
    $(".directDisplayContent").hide();
  },
  render: function() {
    var searchAssistsObj = [];

    var searchAssist = this.state.data[0];
    var contactInfo = this.state.subData && this.state.subData[0];

    for (var item in searchAssist) {
      if(searchAssist.hasOwnProperty(item)) {
        var saSubSet = {};
        saSubSet.name = searchAssist[item].name;
        saSubSet.wiki = searchAssist[item].wiki.en || searchAssist[item].wiki.zh;
        saSubSet.intl = searchAssist[item].wiki.en !== undefined ? "en" : "zh";
        saSubSet.tag = searchAssist[item].tag;
        searchAssistsObj.push(saSubSet);
      }
    }

    console.log("contactInfo = ", contactInfo);
    var contacts = [];
    for (var info in contactInfo) {
      if(contactInfo.hasOwnProperty(info)) {
        contacts.push(<Contact contact={contactInfo[info]} key={info} />);
      }
    }

    return(
      <div id="regionNavInfo">
        <div className="row-fluid">
          <div className="span7">
            <span id="regionSearchBox">
              <Typeahead
                customClasses={typeaheadClass}
                defaultClassNames={false}
                placeholder={typeheadPlaceHolder}
                options={searchAssistsObj}
                filterOption='name'
                displayOption={this.directDisplayOption}
                maxVisible={10}
                highlight={true}
                onOptionSelected={this.updateDirectDisplay} />
            </span>
            <span id="regionResume">
              <span>or download Curriculum vita <a target="_blank" href="https://github.com/bryanyuan2/bryanyuan2.resume/raw/master/ChengChunYuan_resume_v1.pdf">here</a></span>
            </span>
          </div>
          <div id="regionContacts" className="span3">
            <span className="row header_icons_section">{contacts}</span>
          </div>
        </div>
        <hr />
        <div id="regionDirectDisplay">
            <DirectDisplay wiki={this.state.wiki} intl={this.state.intl} target={this.state.target} tag={this.state.tag} />
        </div>
      </div>
    );
  }
});

module.exports = CompNavInfoContainer;
