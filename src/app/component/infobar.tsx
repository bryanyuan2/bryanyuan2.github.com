import React from 'react';

interface InfoBarProps {
    info?: {
        github?: string;
        speakerdeck?: string;
        youtube?: string;
    };
}

const InfoBar: React.FC<InfoBarProps> = ({ info = {} }) => {
    return (
        <div className="btn-block-group">
            {info?.github && (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={info.github}
                    className="btn btn-default btn-sm btn-block-default"
                    type="button"
                >
                    github
                </a>
            )}
            {info?.speakerdeck && (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={info.speakerdeck}
                    className="btn btn-default btn-sm btn-block-default"
                    type="button"
                >
                    speakerdeck
                </a>
            )}
            {info?.youtube && (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={info.youtube}
                    className="btn btn-default btn-sm btn-block-default"
                    type="button"
                >
                    youtube
                </a>
            )}
        </div>
    );
};

export default InfoBar;
