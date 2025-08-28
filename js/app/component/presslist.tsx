import React from 'react';
import PropTypes from 'prop-types';

class PressList extends React.Component {
    static propTypes = {
        press: PropTypes.array,
    };

    static defaultProps = {
        press: [],
    };

    render() {
        const press = [];
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
