import React, {useState, useEffect} from 'react';
import Header from './../component/header';
import PropTypes from 'prop-types';

const Certification = ({cert = {}}) => {
    return (
        <div>
            <div className="data-communities row">
                <div className="col-md-2 text-date">
                    <p>{cert.startDate} - {cert.endDate}</p>
                </div>

                <div className="col-md-8">
                    <blockquote className={cert.hl}>
                        <div className="text-title"><a target="_blank" rel="noopener noreferrer" href={cert.link}>{cert.name}</a></div>
                        <div className="text-desc">{cert.institution}, {cert.authority}</div>
                    </blockquote>
                </div>
                <div className="col-md-2 img-nostyle">
                    <img src={cert.image} alt={cert.alt} width={cert.width} height={cert.height} />
                </div>
            </div>
            <br />
        </div>
    );
};

Certification.propTypes = {
    cert: PropTypes.object,
};

const CertificationContainer = ({url}) => {
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
        <div id="region-certification">
            <Header setID="certification" text="Certification" />
            <hr />
            {data.map((cert, index) => (
                <Certification cert={cert} key={index} />
            ))}
            <br />
        </div>
    );
};

CertificationContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default CertificationContainer;
