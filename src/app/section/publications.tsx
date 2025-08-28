import React, { useState, useEffect } from 'react';
import SectionHeader from './../component/section-header.tsx';

interface PublicationProps {
    publication: {
        date?: string;
        hl?: string;
        link?: string;
        name?: string;
        publication?: string;
        authors?: string;
    };
}

const Publication: React.FC<PublicationProps> = ({ publication = {} }) => {
    return (
        <div className="data-publications row">
            <div className="col-md-2 text-date">
                <p>{publication.date}</p>
            </div>
            <div className="col-md-10">
                <blockquote className={publication.hl}>
                    <p>
                        “
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={publication.link}
                        >
                            {publication.name}
                        </a>
                        ”
                        <br />
                        {publication.publication}
                        <br />
                        {publication.authors && (
                            <i
                                dangerouslySetInnerHTML={{
                                    __html: publication.authors
                                }}
                            />
                        )}
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

interface PublicationsContainerProps {
    url: string;
}

const PublicationsContainer: React.FC<PublicationsContainerProps> = ({
    url
}) => {
    const [data, setData] = useState<PublicationProps['publication'][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-publications" data-testid="region-publications">
            <SectionHeader setID="publications" text="Publications" />
            <hr />
            {data.map((publication, index) => (
                <Publication publication={publication} key={index} />
            ))}
            <br />
        </div>
    );
};

export default PublicationsContainer;
