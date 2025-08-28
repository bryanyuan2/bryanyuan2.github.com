import React, {useState, useEffect} from 'react';
import SectionHeader from './../component/section-header.tsx';

interface SummaryProps {
    summary: {
        items?: string;
    };
}

const Summary: React.FC<SummaryProps> = ({summary = {}}) => {
    let output = '';
    if (summary.items) {
        output += `<div class="text-summary">${summary.items}</div>`;
    }

    return (
        <div className="data-summary">
            <div dangerouslySetInnerHTML={{__html: output}} />
        </div>
    );
};

interface SummaryContainerProps {
    url: string;
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({url}) => {
    const [data, setData] = useState<SummaryProps['summary'][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, [url]);

    return (
        <div id="region-summary">
            <SectionHeader setID="desc" text="Summary of Qualifications" />
            <hr />
            {data.map((summary, index) => (
                <Summary summary={summary} key={index} />
            ))}
            <br />
        </div>
    );
};

export default SummaryContainer;
