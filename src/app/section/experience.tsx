import React, { useState, useEffect } from 'react';
import PressList from './../component/presslist.tsx';
import AwardsList from './../component/awardslist.tsx';
import SectionHeader from './../component/section-header.tsx';

interface WorkProps {
    work: {
        corp?: Array<{
            date?: string;
            name?: string;
            url?: string;
            position?: string;
            logo?: string;
            logoalt?: string;
            width?: number;
            height?: number;
        }>;
        hl?: string;
        experience?: Array<{
            title?: string;
            thumbnails?: Array<{
                src: string;
                alt: string;
                desc: string;
            }>;
        }>;
        awards?: Array<string>;
        media?: Array<{
            source?: string;
            link?: string;
            title?: string;
        }>;
        product?: Array<{
            link: string;
            img: string;
            title: string;
        }>;
    };
}

const Work: React.FC<WorkProps> = ({ work = {} }) => {
    const renderExperience = (data: WorkProps['work']['experience']) => {
        return data?.map((obj, index) => (
            <div key={index}>
                {obj.title && (
                    <div className="text-desc-title">{obj.title}</div>
                )}
                {obj.thumbnails &&
                    Array.isArray(obj.thumbnails) &&
                    obj.thumbnails.map((item, idx) => (
                        <div className="col-md-4" key={idx}>
                            <a href={item.src}>
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="img-thumbnail"
                                    width="140"
                                    height="140"
                                    loading="lazy"
                                />
                                <div className="img-caption">{item.desc}</div>
                            </a>
                        </div>
                    ))}
            </div>
        ));
    };

    const renderProduct = (data: WorkProps['work']['product']) => {
        return (
            <div className="text-ref-set">
                <ul>
                    {data?.map((info, index) => (
                        <li key={index}>
                            <a
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="text-ref-icon"
                                    src={info.img}
                                    alt={info.title}
                                    loading="lazy"
                                />
                                <span className="text-ref-title">
                                    {info.title}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="data-experience row">
            <div className="col-md-2 text-date">
                {work.corp?.map((data, index) => (
                    <p key={index}>{data.date}</p>
                ))}
            </div>
            <div className="col-md-8">
                <blockquote className={work.hl}>
                    {work.corp?.map((data, index) => (
                        <div key={index} className="text-title-italic">
                            <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.name}
                            </a>
                            {data.position && (
                                <span className="text-desc">
                                    {' '}
                                    / {data.position}
                                </span>
                            )}
                        </div>
                    ))}
                    <ul className="text-desc">
                        {renderExperience(work.experience)}
                    </ul>
                    {work.awards && <AwardsList awards={work.awards} />}
                    {work.media && (
                        <PressList
                            press={work.media.map((item) => ({
                                link: item.link || '',
                                title: item.title || '',
                                source: item.source || ''
                            }))}
                        />
                    )}
                    {work.product && renderProduct(work.product)}
                </blockquote>
            </div>
            <div className="col-md-2 img-nostyle">
                {work.corp?.map(
                    (data, index) =>
                        data.logo && (
                            <img
                                key={index}
                                src={data.logo}
                                alt={data.logoalt}
                                width={data.width}
                                height={data.height}
                                loading="lazy"
                            />
                        )
                )}
            </div>
        </div>
    );
};

interface WorksContainerProps {
    url: string;
}

const WorksContainer: React.FC<WorksContainerProps> = ({ url }) => {
    const [data, setData] = useState<WorkProps['work'][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-experience">
            <SectionHeader setID="experience" text="Work Experience" />
            <hr />
            {data.map((work, index) => (
                <Work work={work} key={index} />
            ))}
            <br />
        </div>
    );
};

export default WorksContainer;
