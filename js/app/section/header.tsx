import React, {useState, useEffect} from 'react';

interface HeaderData {
    title?: string;
    linkedin?: string;
    linkedinImg?: string;
    linkedAlt?: string;
    linkedText?: string;
}

interface HeaderContainerProps {
    url: string;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({url}) => {
    const [data, setData] = useState<HeaderData>({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-header">
            <div className="header-bg">
                <div className="header-title">{data.title}</div>
            </div>
            <div id="linkedin-nav">
                <a target="_blank" rel="noopener noreferrer" href={data.linkedin}>
                    <img src={data.linkedinImg} alt={data.linkedAlt} />
                    <div className="test_content">{data.linkedText}</div>
                </a>
            </div>
        </div>
    );
};

export default HeaderContainer;
