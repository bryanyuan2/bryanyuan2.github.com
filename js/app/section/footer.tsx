import React, { useState, useEffect, memo } from 'react';

interface PackProps {
    items: {
        url?: string;
        img?: string;
    };
}

const Pack: React.FC<PackProps> = memo(({ items = {} }) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={items.url}>
            <img
                className="footer-img"
                width="auto"
                height="32"
                src={items.img}
                alt="footer item"
            />
        </a>
    );
});

Pack.displayName = 'Pack';

interface FooterContainerProps {
    url: string;
}

const FooterContainer: React.FC<FooterContainerProps> = ({ url }) => {
    const [data, setData] = useState<PackProps['items'][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    return (
        <div id="region-footer">
            <hr />
            Powered by
            {data.map((item, index) => (
                <Pack items={item} key={index} />
            ))}
            <br />
        </div>
    );
};

export default FooterContainer;
