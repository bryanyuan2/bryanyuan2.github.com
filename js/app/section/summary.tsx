import React, {useState, useEffect} from 'react';
import SectionHeader from './../component/section-header.tsx';
import PropTypes from 'prop-types';

const Summary = ({summary = {}}) => {
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

Summary.propTypes = {
    summary: PropTypes.object,
};

const SummaryContainer = ({url}) => {
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

SummaryContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default SummaryContainer;
