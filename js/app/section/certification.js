import React from 'react';
import { LoadJSON } from './../utils/mixins';
import Header from './../component/header';
import { PureRenderMixin } from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const Certification = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        cert: PropTypes.object
    },
    getDefaultProps: function() {
        return {
            cert: {}
        };
    },
    render: function() {

        return (
            <div>
                <div className="data-communities row">
                    <div className="col-md-2 text-date">
                        <p>{this.props.cert.startDate} - {this.props.cert.endDate}</p>
                    </div>

                    <div className="col-md-8">
                        <blockquote className={this.props.cert.hl}>
                        <div className="text-title"><a target="_blank" rel="noopener noreferrer" href={this.props.cert.link}>{this.props.cert.name}</a></div>
                        <div className="text-desc">{this.props.cert.institution}, {this.props.cert.authority}</div>
                        </blockquote>
                    </div>
                    <div className="col-md-2 img-nostyle">
                        <img src={this.props.cert.image} alt={this.props.cert.alt} width={this.props.cert.width} height={this.props.cert.height} />
                    </div>
                </div>
                <br />
            </div>
        );
    },
});

const CertificationContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const certification = [];
        this.state.data.forEach(function(cert, index) {
            console.log('cert', cert);
            // need to keep key={index} to avoid the following warning
            // warning: Each child in a list should have a unique "key" prop.
            certification.push(<Certification cert={cert} key={index} />);
        });
        return (
            <div id="region-certification">
                <Header setID="certification" text="Certification" />
                <hr />
                {certification}
                <br />
            </div>
        );
    },
});

export default CertificationContainer;
