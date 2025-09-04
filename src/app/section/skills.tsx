import React, { useState, useEffect, FC } from 'react';
import SectionHeader from './../component/section-header.tsx';

interface SkillProps {
    skill?: {
        title?: string;
        hl?: string;
        items?: Array<{
            name: string;
        }>;
    };
}

const Skill: React.FC<SkillProps> = ({ skill = {} }) => {
    const items = skill.items?.map(
        (content) => `<span class="text-hints">${content.name}</span>`
    );

    return (
        <div className="data-skills row">
            <div className="col-md-2 fs-16">
                <p>{skill.title}</p>
            </div>
            <div className="col-md-10 fs-16">
                <blockquote className={skill.hl}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: items?.join(', ') || ''
                        }}
                    />
                </blockquote>
            </div>
        </div>
    );
};

interface SkillsContainerProps {
    url: string;
}

const SkillsContainer: FC<SkillsContainerProps> = ({ url }) => {
    const [data, setData] = useState<Array<SkillProps['skill']>>([]);

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
            <SectionHeader setID="skills" text="Technical Keywords" />
            <hr />
            {data.map((skill, index) => (
                <Skill skill={skill} key={index} />
            ))}
            <br />
        </div>
    );
};

export default SkillsContainer;
