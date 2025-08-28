import React from 'react';

interface SectionHeaderProps {
    setID?: string;
    text?: string;
}

class SectionHeader extends React.Component<SectionHeaderProps> {
    static defaultProps: Partial<SectionHeaderProps> = {
        setID: '',
        text: '',
    };

    render() {
        const id = this.props.setID ? 'set-' + this.props.setID : 'set';
        return (
            <h2 className="text-section" id={id}>{this.props.text}</h2>
        );
    }
}

export default SectionHeader;
