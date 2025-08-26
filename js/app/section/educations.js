import React, { useState, useEffect } from 'react';
import Header from './../component/header';
import PropTypes from 'prop-types';

const Education = ({ education = {} }) => {
    const honors = education.honors?.map((content) => (
        `<strong>Honors</strong>: <a target="_blank" rel="noopener noreferrer" href="${content.link}">${content.title}</a>`
    ));

    return (
        <div className="data-education row">
            <div className="col-md-2 text-date">
                <p>{education.date}</p>
            </div>
            <div className="col-md-10">
                <blockquote className={education.hl}>
                    <p><strong>{education.degree}, <i>{education.school}</i></strong> - <a target="_blank" rel="noopener noreferrer" href="http://iisr.csie.ncu.edu.tw/">{education.lab}</a></p>
                    <ol>
                        {honors && <li dangerouslySetInnerHTML={{ __html: honors.join('') }} />}
                        {education.description && <li>{education.description}</li>}
                    </ol>
                </blockquote>
            </div>
        </div>
    );
};

Education.propTypes = {
    education: PropTypes.object,
};

const EducationsContainer = ({ url }) => {
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
        <div id="region-education">
            <Header setID="education" text="Education" />
            <hr />
            {data.map((education, index) => (
                <Education education={education} key={index} />
            ))}
            <br />
        </div>
    );
};

EducationsContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default EducationsContainer;