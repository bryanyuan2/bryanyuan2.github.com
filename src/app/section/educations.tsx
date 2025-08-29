import React, { useState, useEffect } from 'react';
import SectionHeader from './../component/section-header.tsx';

interface EducationProps {
    education: {
        date?: string;
        hl?: string;
        degree?: string;
        school?: string;
        lab?: string;
        description?: string;
        honors?: { link: string; title: string }[];
    };
}

const Education: React.FC<EducationProps> = ({ education = {} }) => {
    let honors: string[] = [];
    if (education.honors) {
        honors = education.honors.map(
            (content) =>
                `<strong>Honors</strong>: <a target="_blank" rel="noopener noreferrer" href="${content.link}">${content.title}</a>`
        );
    }

    return (
        <div className="data-education row">
            <div className="col-md-2 text-date">
                <p>{education.date}</p>
            </div>
            <div className="col-md-10">
                <blockquote className={education.hl}>
                    <p>
                        <strong>
                            {education.degree}, <i>{education.school}</i>
                        </strong>{' '}
                        -{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://iisr.csie.ncu.edu.tw/"
                        >
                            {education.lab}
                        </a>
                    </p>
                    {education.description && (
                        <ol>
                            {honors && (
                                <li
                                    dangerouslySetInnerHTML={{
                                        __html: honors.join('')
                                    }}
                                />
                            )}
                            <li>{education.description}</li>
                        </ol>
                    )}
                </blockquote>
            </div>
        </div>
    );
};

interface EducationsContainerProps {
    url: string;
}

const EducationsContainer: React.FC<EducationsContainerProps> = ({ url }) => {
    const [data, setData] = useState<EducationProps['education'][]>([]);

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
            <SectionHeader setID="education" text="Education" />
            <hr />
            {data.map((education, index) => (
                <Education education={education} key={index} />
            ))}
            <br />
        </div>
    );
};

export default EducationsContainer;
