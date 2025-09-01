import React, { useState, useEffect } from 'react';
import SectionHeader from './../component/section-header.tsx';

interface CertificationProps {
    cert: {
        startDate?: string;
        endDate?: string;
        hl?: string;
        link?: string;
        name?: string;
        institution?: string;
        authority?: string;
        image?: string;
        alt?: string;
        width?: number;
        height?: number;
    };
}

const Certification: React.FC<CertificationProps> = ({ cert = {} }) => {
    return (
        <div>
            <div className="data-communities row">
                <div className="col-md-2 text-date">
                    <p>
                        {cert.startDate} - {cert.endDate}
                    </p>
                </div>

                <div className="col-md-8">
                    <blockquote className={cert.hl}>
                        <div className="text-title">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={cert.link}
                            >
                                {cert.name}
                            </a>
                        </div>
                        <div className="text-desc">
                            {cert.institution}, {cert.authority}
                        </div>
                    </blockquote>
                </div>
                <div className="col-md-2 img-nostyle">
                    <img
                        src={cert.image}
                        alt={cert.alt}
                        width={cert.width}
                        height={cert.height}
                        loading="lazy"
                    />
                </div>
            </div>
            <br />
        </div>
    );
};

interface CertificationContainerProps {
    url: string;
}

const CertificationContainer: React.FC<CertificationContainerProps> = ({
    url
}) => {
    const [data, setData] = useState<CertificationProps['cert'][]>([]);

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
            <SectionHeader setID="certification" text="Certification" />
            <hr />
            {data.map((cert, index) => (
                <Certification cert={cert} key={index} />
            ))}
            <br />
        </div>
    );
};

export default CertificationContainer;
