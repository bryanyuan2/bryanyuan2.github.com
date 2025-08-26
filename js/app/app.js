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
            <CompHeader url="asserts/data/commons.json" />
            <div className="container">
                <CompSummary url="asserts/data/summary.json" />
                <CompSkills url="asserts/data/skills.json" />
                <CompWorks url="asserts/data/works.json" />
                <CompCertification url="asserts/data/certification.json" />
                <CompHackathon url="asserts/data/hackathon.json" />
                <CompCommunities url="asserts/data/communities.json" />
                <CompPublications url="asserts/data/publications.json" />
                <CompEducations url="asserts/data/educations.json" />
                <CompFooter url="asserts/data/footer.json" />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('target')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
