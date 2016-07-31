"use strict";

/* require */
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = require('react-router').IndexRoute,
    browserHistory = require('react-router/lib/browserHistory');

/* section */
var CompHeader = require('./section/header'),
    CompNavInfo = require('./section/navinfo'),
    CompEducations = require('./section/educations'),
    CompSkills = require('./section/skills'),
    CompWorks = require('./section/works'),
    CompAwards = require('./section/awards'),
    CompProjects = require('./section/projects'),
    CompCommunities = require('./section/communities'),
    CompPublications = require('./section/publications'),
    CompFooter = require('./section/footer-ver');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <CompHeader url="asserts/data/commons.json" />
        <div className="container">
          <CompNavInfo url={["asserts/data/directdisplay.json", "asserts/data/contact.json"]} />
          <CompEducations url="asserts/data/educations.json" />
          <CompSkills url="asserts/data/skills.json" />
          <CompWorks url="asserts/data/works.json" />
          <CompAwards url="asserts/data/awards.json" />
          <CompProjects url="asserts/data/projects.json" />
          <CompCommunities url="asserts/data/communities.json" />
          <CompPublications url="asserts/data/publications.json" />
          <CompFooter url="asserts/data/footer.json" />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route path='/'>
    <IndexRoute component={App} />
  </Route>
);

/* customize js */
$(document).ready(function() {
  var header_title_opacity = 16;
  var jumboHeight = $('.jumbotron').outerHeight();
  var parallax = function parallax(){
      var scrolled = $(window).scrollTop();
      $('.header-bg').css('height', (jumboHeight - scrolled) + 'px');
  };
  $(window).scroll(function(){
      parallax();
      $(".header-title").css("opacity", header_title_opacity/$(window).scrollTop());
      if ($(window).scrollTop()<=0) {
        $(".header-title").css("opacity", 1);
      }
  });
});

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('container'));