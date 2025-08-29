import React from 'react';

interface PressListProps {
    press?: Array<{
        link: string;
        title: string;
        source: string;
    }>;
}

const PressList: React.FC<PressListProps> = ({ press = [] }) => {
    const pressArray: string[] = [];

    if (press) {
        press.forEach((content) => {
            pressArray.push(
                '<li><a target="_blank" rel="noopener noreferrer" href=' +
                    content.link +
                    '>' +
                    content.title +
                    ' - ' +
                    content.source +
                    '</a></li>'
            );
        });
    }
    
    const pressContent = pressArray.join(' ');
    
    return (
        <div className="text-press">
            <div dangerouslySetInnerHTML={{ __html: pressContent }} />
        </div>
    );
};

export default PressList;
