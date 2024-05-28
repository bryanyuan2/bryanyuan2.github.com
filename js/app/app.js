/** @jsx React.DOM */

'use strict';

/* require */
const React = require('react');
const ReactDOM = require('react-dom');

const createReactClass = require('create-react-class');

/* section */
const CompHeader = require('./section/header');
const CompSummary = require('./section/summary');
const CompEducations = require('./section/educations');
const CompSkills = require('./section/skills');
const CompWorks = require('./section/works');
const CompHackathon = require('./section/hackathon');
const CompCommunities = require('./section/communities');
const CompPublications = require('./section/publications');
const CompFooter = require('./section/footer-ver');

const App = createReactClass({
    render: function() {
        return (
            <div>
                <CompHeader url="data/commons.json" />
                <div className="container">
                    <CompSummary url="data/summary.json" />
                    <CompSkills url="data/skills.json" />
                    <CompWorks url="data/works.json" />
                    <CompHackathon url="data/hackathon.json" />
                    <CompCommunities url="data/communities.json" />
                    <CompPublications url="data/publications.json" />
                    <CompEducations url="data/educations.json" />
                    <CompFooter url="data/footer.json" />
                </div>
            </div>
        );
    },
});

ReactDOM.render(<App />, document.getElementById('container'));