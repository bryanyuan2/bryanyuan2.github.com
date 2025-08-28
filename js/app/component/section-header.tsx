import React from 'react';
import PropTypes from 'prop-types';

class SectionHeader extends React.Component {
    static propTypes = {
        setID: PropTypes.string,
        text: PropTypes.string,
    };

    static defaultProps = {
        setID: {},
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
