import React from 'react';

interface PressListProps {
    press?: Array<{
        link: string;
        title: string;
        source: string;
    }>;
}

class PressList extends React.Component<PressListProps> {
    static defaultProps: Partial<PressListProps> = {
        press: [],
    };

    render() {
        const press: string[] = [];
        let pressContent = '';

        if (this.props.press) {
            this.props.press.forEach((content) => {
                press.push(
                    '<li><a target="_blank" rel="noopener noreferrer" href=' +
                    content.link +
                    '>' +
                    content.title +
                    ' - ' +
                    content.source +
                    '</a></li>',
                );
            });
        }
        pressContent = press.join(' ');
        return (
            <div className="text-press">
                <div dangerouslySetInnerHTML={{__html: pressContent}} />
            </div>
        );
    }
}

export default PressList;
