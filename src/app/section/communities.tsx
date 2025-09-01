import React, { useState, useEffect, memo } from 'react';
import SectionHeader from './../component/section-header.tsx';

interface CommunityProps {
    community: {
        date?: string;
        hl?: string;
        link?: string;
        name?: string;
        position?: string;
        description?: { text: string }[];
        image?: string;
        width?: number;
        height?: number;
    };
}

const Community: React.FC<CommunityProps> = memo(({ community = {} }) => {
    const description = (community.description || [])
        .map((content) => `<span class="text-desc-list">${content.text}</span>`)
        .join('');

    return (
        <div>
            <div className="data-communities row">
                <div className="col-md-2 text-date">
                    <p>{community.date}</p>
                </div>

                <div className="col-md-8">
                    <blockquote className={community.hl}>
                        <div className="text-title">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={community.link}
                            >
                                {community.name}
                            </a>
                        </div>
                        <div className="text-desc">{community.position}</div>
                        <ul className="text-desc">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description
                                }}
                            />
                        </ul>
                    </blockquote>
                </div>
                <div className="col-md-2 img-nostyle">
                    <img
                        src={community.image}
                        alt={community.name}
                        width={community.width}
                        height={community.height}
                        loading="lazy"
                    />
                </div>
            </div>
            <br />
        </div>
    );
});

Community.displayName = 'Community';

interface CommunitiesContainerProps {
    url: string;
}

const CommunitiesContainer: React.FC<CommunitiesContainerProps> = ({ url }) => {
    const [data, setData] = useState<CommunityProps['community'][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-communities">
            <SectionHeader setID="communities" text="Communities" />
            <hr />
            {data.map((community, index) => (
                <Community community={community} key={index} />
            ))}
            <br />
        </div>
    );
};

export default CommunitiesContainer;
