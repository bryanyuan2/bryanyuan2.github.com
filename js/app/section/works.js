import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PressList from './../component/presslist';
import AwardsList from './../component/awardslist';
import SectionHeader from './../component/section-header';

const Work = ({work = {}}) => {
    const renderExperience = (data) => {
        return data.map((obj, index) => (
            <div key={index}>
                {obj.title && <div className="text-desc-title">{obj.title}</div>}
                {obj.thumbnails && Array.isArray(obj.thumbnails) && (
                    obj.thumbnails.map((item, idx) => (
                        <div className="col-md-4" key={idx}>
                            <a href={item.src}>
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="img-thumbnail"
                                    width="140"
                                    height="140"
                                />
                                <div className="img-caption">{item.desc}</div>
                            </a>
                        </div>
                    ))
                )}
            </div>
        ));
    };

    const renderProduct = (data) => {
        return (
            <div className="text-ref-set">
                <ul>
                    {data.map((info, index) => (
                        <li key={index}>
                            <a href={info.link} target="_blank" rel="noopener noreferrer">
                                <img className="text-ref-icon" src={info.img} alt={info.title} />
                                <span className="text-ref-title">{info.title}</span>
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
                {work.corp.map((data, index) => (
                    <p key={index}>{data.date}</p>
                ))}
            </div>
            <div className="col-md-8">
                <blockquote className={work.hl}>
                    {work.corp.map((data, index) => (
                        <div key={index} className="text-title-italic">
                            <a href={data.url} target="_blank" rel="noopener noreferrer">
                                {data.name}
                            </a>
                            {data.position && (
                                <span className="text-desc"> / {data.position}</span>
                            )}
                        </div>
                    ))}
                    <ul className="text-desc">
                        {renderExperience(work.experience)}
                    </ul>
                    {work.photo && (
                        <img
                            src={work.photo.src}
                            alt={work.photo.alt}
                            width={work.photo.width}
                            height={work.photo.height}
                        />
                    )}
                    {work.awards && <AwardsList awards={work.awards} />}
                    {work.media && <PressList press={work.media} />}
                    {work.product && renderProduct(work.product)}
                </blockquote>
            </div>
            <div className="col-md-2 img-nostyle">
                {work.corp.map((data, index) => (
                    <img
                        key={index}
                        src={data.logo}
                        alt={data.logoalt}
                        width={data.width}
                        height={data.height}
                    />
                ))}
            </div>
        </div>
    );
};

Work.propTypes = {
    work: PropTypes.object,
};

const WorksContainer = ({url}) => {
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

WorksContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default WorksContainer;
