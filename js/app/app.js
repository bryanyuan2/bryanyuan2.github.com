import React from 'react';
import ReactDOM from 'react-dom/client';

// Base URL for data paths
const BASE_URL = 'asserts/data';

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
import CompPhotoset from './section/photoset';

const App = () => {
    return (
        <div>
            <CompHeader url={`${BASE_URL}/commons.json`} />
            <div className="container">
                <CompSummary url={`${BASE_URL}/summary.json`} />
                <CompSkills url={`${BASE_URL}/skills.json`} />
                <CompWorks url={`${BASE_URL}/works.json`} />
                <CompPhotoset
                    url={`${BASE_URL}/cychengatwork_photoset.json`}
                    setID="cychengatwork"
                    text="Bryan Cheng (@cycheng) at Work"
                    moreURL="https://www.flickr.com/photos/cycheng-at-work/"
                    moreImg="asserts/images/icons/flickr.png"
                    moreText="check more on Flickr (@cycheng-at-work)"
                />
                <CompCertification url={`${BASE_URL}/certification.json`} />
                <CompHackathon url={`${BASE_URL}/hackathon.json`} />
                <CompCommunities url={`${BASE_URL}/communities.json`} />
                <CompPublications url={`${BASE_URL}/publications.json`} />
                <CompEducations url={`${BASE_URL}/educations.json`} />
                <CompPhotoset
                    url={`${BASE_URL}/interests_photoset.json`}
                    setID="gallery"
                    text="Interests in Muay Thai"
                />
                <CompFooter url={`${BASE_URL}/footer.json`} />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('target')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
