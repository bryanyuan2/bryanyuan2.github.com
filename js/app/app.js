'use strict';

/* require */
const React = require('react');
const ReactDOM = require('react-dom/client');

/* section */
const CompHeader = require('./section/header');
const CompSummary = require('./section/summary');
const CompEducations = require('./section/educations');
const CompSkills = require('./section/skills');
const CompWorks = require('./section/works');
const CompHackathon = require('./section/hackathon');
const CompCommunities = require('./section/communities');
const CompPublications = require('./section/publications');
const CompCertification = require('./section/certification');
const CompFooter = require('./section/footer');

const App = () => {
    return (
        <div>
            <CompHeader url="data/commons.json" />
            <div className="container">
                <CompSummary url="data/summary.json" />
                <CompSkills url="data/skills.json" />
                <CompWorks url="data/works.json" />
                <CompCertification url="data/certification.json" />
                <CompHackathon url="data/hackathon.json" />
                <CompPublications url="data/publications.json" />
                <CompEducations url="data/educations.json" />
                <CompFooter url="data/footer.json" />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('target')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)