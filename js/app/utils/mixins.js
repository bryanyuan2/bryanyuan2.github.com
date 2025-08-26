'use strict';

const PropTypes = require('prop-types');

const Mixins = {
    LoadJSON: {
        propTypes: function() {
            url: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.array,
            ]);
        },
        getInitialState: function() {
            return {
                data: [],
                dataSub: [],
            };
        },
        loadData: async function() {
            if (typeof(this.props.url) === 'string') {
                const response = await fetch(this.props.url);
                const data = await response.json();
                this.setState({data: data});
            } else if (Array.isArray(this.props.url)) {
                const fetchPromises = this.props.url.map(url => fetch(url).then(res => res.json()));
                const results = await Promise.all(fetchPromises);
                this.setState({data: results[0]});
            }
        },
        componentDidMount: function() {
            this.loadData();
        },
    },
};

module.exports = Mixins;