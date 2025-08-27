import React, {useState, useEffect} from 'react';
import SectionHeader from './../component/section-header';
import PropTypes from 'prop-types';
import lightbox from 'lightbox2';

const Photo = ({photo = {}}) => {
    return (
        <a
            href={photo.src}
            data-lightbox="photoset"
            data-title={photo.alt}
            data-width={photo.width}
            data-height={photo.height}
        >
            <div className="photo-block">
                <img
                    className='img-thumbnail'
                    src={photo.thumbnail}
                    alt={photo.alt}
                />
            </div>
        </a>
    );
};

Photo.propTypes = {
    photo: PropTypes.object,
};

const PhotosetContainer = ({url, sectionID, text, moreURL, moreText, moreImg}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    // initialize lightbox2
    useEffect(() => {
        lightbox.option({
            resizeDuration: 180,
            wrapAround: true,
        });
    }, []);

    return (
        <div id="region-photoset">
            <SectionHeader setID={sectionID} text={text} />
            <hr />
            <div>
                <div className="photo-gallery">
                    {data.map((photo, index) => (
                        <Photo photo={{...photo}} key={index} />
                    ))}
                </div>
                {moreURL && moreText && (
                    <div className="photo-more">
                        <a href={moreURL} target="_blank" rel="noopener noreferrer">
                            {moreImg && <img className="morelink" src={moreImg} alt={moreText} />}
                            {moreText}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

PhotosetContainer.propTypes = {
    url: PropTypes.string.isRequired,
    sectionID: PropTypes.string,
    text: PropTypes.string,
    moreURL: PropTypes.string,
    moreText: PropTypes.string,
    moreImg: PropTypes.string,
};

export default PhotosetContainer;
