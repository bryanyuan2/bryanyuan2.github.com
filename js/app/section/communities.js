import React, {useState, useEffect, memo} from 'react';
import Header from './../component/header';
import PropTypes from 'prop-types';

const Community = memo(({community = {}}) => {
    const description = community.description
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
                            <a target="_blank" rel="noopener noreferrer" href={community.link}>{community.name}</a>
                        </div>
                        <div className="text-desc">{community.position}</div>
                        <ul className="text-desc">
                            <div dangerouslySetInnerHTML={{__html: description}} />
                        </ul>
                    </blockquote>
                </div>
                <div className="col-md-2 img-nostyle">
                    <img src={community.image} alt={community.name} width={community.width} height={community.height} />
                </div>
            </div>
            <br />
        </div>
    );
});

Community.propTypes = {
    community: PropTypes.object,
};

const CommunitiesContainer = ({url}) => {
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
        <div id="region-communities">
            <Header setID="communities" text="Communities" />
            <hr />
            {data.map((community, index) => (
                <Community community={community} key={index} />
            ))}
            <br />
        </div>
    );
};

CommunitiesContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default CommunitiesContainer;

