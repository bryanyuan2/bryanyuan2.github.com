import React, { useState, useEffect } from 'react';
import PressList from './../component/presslist';
import InfoBar from './../component/infobar';
import Header from './../component/header';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Award = ({ award = {} }) => {
    const infobarAry = {
        'speakerdeck': _.get(award, ['speakerdeck']),
        'youtube': _.get(award, ['youtube']),
        'github': _.get(award, ['github']),
    };

    const organizerHTML = award.title + (award.organizer ? ' / ' + '<a href="' + award.organizerUrl + '">' + award.organizer + '</a>' : '');

    return (
        <div className="portfolio-block col-xs-6 col-md-4">
            <img width={award.image.width} height={award.image.height} className="img-thumbnail" src={award.image.src} alt="yataiko"/>
            <div className="img-caption">{award.image.caption} / {award.date}</div>
            <div className="text-title" dangerouslySetInnerHTML={{ __html: organizerHTML }} />
            {award.award && (
                <div className="text-subtitle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-bookmark-check-fill text-svg-twitter-blue" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    </svg>
                    <span className="text-subtitle-italic" dangerouslySetInnerHTML={{ __html: award.award }} />
                </div>
            )}
            <div className="text-desc">
                {award.description}
            </div>
            <InfoBar info={infobarAry} />
            <br />
            {award.press && <PressList press={award.press} />}
        </div>
    );
};

Award.propTypes = {
    award: PropTypes.object,
};

const AwardsContainer = ({ url }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-hackathon">
            <Header setID="awards" text="Hackathon Profiles & Awards" />
            <hr />
            {data.map((award, index) => (
                <Award award={award} key={index} />
            ))}
            <br />
        </div>
    );
};

AwardsContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default AwardsContainer;
