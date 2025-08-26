import React, { useState, useEffect } from 'react';
import Header from './../component/header';
import PropTypes from 'prop-types';

const Publication = ({ publication = {} }) => {
    return (
        <div className="data-publications row">
            <div className="col-md-2 text-date">
                <p>{publication.date}</p>
            </div>
            <div className="col-md-10">
                <blockquote className={publication.hl}>
                    <p>
                        “<a target="_blank" rel="noopener noreferrer" href={publication.link}>{publication.name}</a>”<br />
                        {publication.publication}<br />
                        <i dangerouslySetInnerHTML={{ __html: publication.authors }} />
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

Publication.propTypes = {
    publication: PropTypes.object,
};

const PublicationsContainer = ({ url }) => {
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
        <div id="region-publications">
            <Header setID="publications" text="Publications" />
            <hr />
            {data.map((publication, index) => (
                <Publication publication={publication} key={index} />
            ))}
            <br />
        </div>
    );
};

PublicationsContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default PublicationsContainer;