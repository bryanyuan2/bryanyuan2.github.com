import React, {useState, useEffect, memo} from 'react';
import PropTypes from 'prop-types';

const Pack = memo(({items = {}}) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={items.url}>
            <img className="footer-img" width="auto" height="32" src={items.img} alt="footer item" />
        </a>
    );
});

Pack.displayName = 'Pack';
Pack.propTypes = {
    items: PropTypes.object,
};

const FooterContainer = ({url}) => {
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

FooterContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default FooterContainer;
