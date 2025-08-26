import React from 'react';
import ReactDOM from 'react-dom/client';

/* section imports */
import CompHeader from './section/header';
import CompSummary from './section/summary';
import CompEducations from './section/educations';
import CompSkills from './section/skills';
import CompWorks from './section/works';
import CompHackathon from './section/hackathon';
import CompCommunities from './section/communities';
import CompPublications from './section/publications';
import CompCertification from './section/certification';
import CompFooter from './section/footer';

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
                <CompCommunities url="data/communities.json" />
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