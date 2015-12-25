/* require */
var React = require('react'),
    Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route;

/* section */
var CompHeader = require('./header'),
    CompContact = require('./section/contact'),
    CompEducations = require('./section/educations'),
    CompSkills = require('./section/skills'),
    CompWorks = require('./section/works'),
    CompAwards = require('./section/awards'),
    CompProjects = require('./section/projects'),
    CompCommunities = require('./section/communities'),
    CompPublications = require('./section/publications'),
    CompFooter = require('./footer');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <CompHeader url="asserts/data/commons.json" />
        <div className="container">
          <CompContact url="asserts/data/contact.json" />
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
  <Route handler={App}>
  </Route>
);

/* customize js */
$(document).ready(function() {
  var header_title_opacity = 16;
  var jumboHeight = $('.jumbotron').outerHeight();
  var parallax = function parallax(){
      var scrolled = $(window).scrollTop();
      $('.header_bg').css('height', (jumboHeight - scrolled) + 'px');
  }
  $(window).scroll(function(e){
      parallax();
      $(".header_title").css("opacity", header_title_opacity/$(window).scrollTop());
      if ($(window).scrollTop()<=0) {
        $(".header_title").css("opacity", 1);
      }
  });
});

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
