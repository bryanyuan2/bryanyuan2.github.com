import React, { useState, useEffect } from 'react';
import Header from './../component/header';
import PropTypes from 'prop-types';

const Skill = ({ skill = {} }) => {
    const items = skill.items?.map((content) => (
        `<span class="text-hints">${content.name}</span>`
    ));

    return (
        <div className="data-skills row">
            <div className="col-md-2 fs-16">
                <p>{skill.title}</p>
            </div>
            <div className="col-md-8 fs-16">
                <blockquote className={skill.hl}>
                    <div dangerouslySetInnerHTML={{ __html: items?.join(', ') }} />
                </blockquote>
            </div>
        </div>
    );
};

Skill.propTypes = {
    skill: PropTypes.object,
};

const SkillsContainer = ({ url }) => {
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
        <div id="region-skills">
            <Header setID="skills" text="Technical Keywords" />
            <hr />
            {data.map((skill, index) => (
                <Skill skill={skill} key={index} />
            ))}
            <br />
        </div>
    );
};

SkillsContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default SkillsContainer;