import React from 'react';

interface SectionHeaderProps {
    setID?: string;
    text?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ setID = '', text = '' }) => {
    const id = setID ? 'set-' + setID : 'set';
    
    return (
        <h2 className="text-section" id={id}>
            {text}
        </h2>
    );
};

export default SectionHeader;
