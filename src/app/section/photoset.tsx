import React, { useState, useEffect } from 'react';
import SectionHeader from './../component/section-header.tsx';
import lightbox from 'lightbox2';

interface PhotoProps {
    photo: {
        src?: string;
        alt?: string;
        width?: number;
        height?: number;
        thumbnail?: string;
    };
}

const Photo: React.FC<PhotoProps> = ({ photo = {} }) => {
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
                    className="img-thumbnail"
                    src={photo.thumbnail}
                    alt={photo.alt}
                    loading="lazy"
                />
            </div>
        </a>
    );
};

interface PhotosetContainerProps {
    url: string;
    sectionID?: string;
    text?: string;
    moreURL?: string;
    moreText?: string;
    moreImg?: string;
}

const PhotosetContainer: React.FC<PhotosetContainerProps> = ({
    url,
    sectionID,
    text,
    moreURL,
    moreText,
    moreImg
}) => {
    const [data, setData] = useState<PhotoProps['photo'][]>([]);

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
            wrapAround: true
        });
    }, []);

    return (
        <div id="region-photoset">
            <SectionHeader setID={sectionID} text={text} />
            <hr />
            <div>
                <div className="photo-gallery">
                    {data.map((photo, index) => (
                        <Photo photo={{ ...photo }} key={index} />
                    ))}
                </div>
                {moreURL && moreText && (
                    <div className="photo-more">
                        <a
                            href={moreURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {moreImg && (
                                <img
                                    className="morelink"
                                    src={moreImg}
                                    alt={moreText}
                                    loading="lazy"
                                />
                            )}
                            {moreText}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotosetContainer;
