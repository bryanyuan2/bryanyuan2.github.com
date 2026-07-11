import React, { useState, useEffect } from 'react';

interface NaviItem {
    id?: string;
    text?: string;
}

interface NavibarProps {
    url: string;
}

const Navibar: React.FC<NavibarProps> = ({ url }) => {
    const [data, setData] = useState<NaviItem[]>([]);
    const [activeId, setActiveId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    useEffect(() => {
        if (data.length === 0 || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id.replace(/^set-/, ''));
                    }
                });
            },
            { rootMargin: '0px 0px -70% 0px' }
        );

        const sections = data
            .map((item) => document.getElementById(`set-${item.id}`))
            .filter((el): el is HTMLElement => el !== null);
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [data]);

    return (
        <div id="region-navibar">
            <nav className="navibar-wrapper">
                <ul className="navibar-list">
                    {data.map((item, index) => (
                        <li className="navibar-item" key={index}>
                            <a
                                className={
                                    activeId === item.id
                                        ? 'navibar-link navibar-link-active'
                                        : 'navibar-link'
                                }
                                href={`#set-${item.id}`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navibar;
