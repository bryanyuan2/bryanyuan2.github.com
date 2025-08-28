import React from 'react';

interface InfoBarProps {
    info?: {
        github?: string;
        speakerdeck?: string;
        youtube?: string;
    };
}

class InfoBar extends React.Component<InfoBarProps> {
    static defaultProps: Partial<InfoBarProps> = {
        info: {},
    };

    render() {
        return (
            <div className="btn-block-group">
                {this.props.info?.github && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={this.props.info.github}
                        className="btn btn-default btn-sm btn-block-default"
                        type="button"
                    >
                        github
                    </a>
                )}
                {this.props.info?.speakerdeck && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={this.props.info.speakerdeck}
                        className="btn btn-default btn-sm btn-block-default"
                        type="button"
                    >
                        speakerdeck
                    </a>
                )}
                {this.props.info?.youtube && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={this.props.info.youtube}
                        className="btn btn-default btn-sm btn-block-default"
                        type="button"
                    >
                        youtube
                    </a>
                )}
            </div>
        );
    }
}

export default InfoBar;
