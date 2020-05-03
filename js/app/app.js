/** @jsx React.DOM */

"use strict";

/* require */
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = require('react-router').IndexRoute,
    createBrowserHistory = require('history').createBrowserHistory;

var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

/* section */
var CompHeader = require('./section/header'),
    CompEducations = require('./section/educations'),
    CompSkills = require('./section/skills'),
    CompWorks = require('./section/works'),
    CompAwards = require('./section/awards'),
    CompProjects = require('./section/projects'),
    CompCommunities = require('./section/communities'),
    CompPublications = require('./section/publications'),
    CompFooter = require('./section/footer-ver');

var App = createReactClass({
  render: function () {
    return (
      <div>
        <CompHeader url="asserts/data/commons.json" />
        <div className="container">
          <CompSkills url="asserts/data/skills.json" />
          <CompWorks url="asserts/data/works.json" />
          <CompAwards url="asserts/data/awards.json" />
          <CompProjects url="asserts/data/projects.json" />
          <CompCommunities url="asserts/data/communities.json" />
          <CompPublications url="asserts/data/publications.json" />
          <CompEducations url="asserts/data/educations.json" />
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


var browserHistory = createBrowserHistory();


ReactDOM.render(<App />, document.getElementById('container'));