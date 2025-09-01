import React from 'react';
import ReactDOM from 'react-dom/client';

const BASE_URL = 'asserts/data';

import CompHeader from './section/header.tsx';
import CompSummary from './section/summary.tsx';
import CompEducations from './section/educations.tsx';
import CompSkills from './section/skills.tsx';
import CompExperience from './section/experience.tsx';
import CompHackathon from './section/hackathon.tsx';
import CompCommunities from './section/communities.tsx';
import CompPublications from './section/publications.tsx';
import CompCertification from './section/certification.tsx';
import CompFooter from './section/footer.tsx';
import CompPhotoset from './section/photoset.tsx';

const App: React.FC = () => {
    return (
        <div>
            <CompHeader url={`${BASE_URL}/commons.json`} />
            <div className="container">
                <CompSummary url={`${BASE_URL}/summary.json`} />
                <CompSkills url={`${BASE_URL}/skills.json`} />
                <CompExperience url={`${BASE_URL}/experience.json`} />
                <CompPhotoset
                    url={`${BASE_URL}/cychengatwork_photoset.json`}
                    setID="cychengatwork"
                    text="Bryan Cheng (@cycheng) at Work"
                    moreURL="https://www.flickr.com/photos/cycheng-at-work/"
                    moreImg="asserts/images/icons/flickr.png"
                    moreText="check more photos on Flickr (@cycheng-at-work)"
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

ReactDOM.createRoot(document.getElementById('target')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
