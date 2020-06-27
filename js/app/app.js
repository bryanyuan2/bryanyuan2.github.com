/** @jsx React.DOM */

'use strict';

/* require */
const React = require('react');
const ReactDOM = require('react-dom');

const createReactClass = require('create-react-class');

/* section */
const CompHeader = require('./section/header');
const CompEducations = require('./section/educations');
const CompSkills = require('./section/skills');
const CompWorks = require('./section/works');
const CompAwards = require('./section/awards');
const CompProjects = require('./section/projects');
const CompCommunities = require('./section/communities');
const CompPublications = require('./section/publications');
const CompFooter = require('./section/footer-ver');

const App = createReactClass({
    render: function() {
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
    },
});

ReactDOM.render(<App />, document.getElementById('container'));
