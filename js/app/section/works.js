const React = require('react');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const PressList = require('./../component/presslist');
const AwardsList = require('./../component/awardslist');
const Header = require('./../component/header');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const Work = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        work: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            work: {},
        };
    },
    renderExperience: function(data) {
        var output = '';

        data.forEach(function(obj) {
            if (obj.title) {
                output += '<div class="text-desc-title">' + obj.title + '</div>';
            }
            if (obj.description) {
                if (Array.isArray(obj.description)) {
                    obj.description.forEach(function(item) {
                        output += '<div class="text-desc-list">' + item + '</div>';
                    });
                } else {
                    output += '<div class="text-desc-list">' + obj.description + '</div>';
                }
            }

            if (obj.thumbnails) {
                if (Array.isArray(obj.thumbnails)) {
                    obj.thumbnails.forEach(function(item) {
                        output += '<div class="col-md-4"><a href="' + item.src + '"><img src="' + item.src + '" src2="' + item.src + '" class="img-thumbnail" alt="' + item.alt + '" width="140" height="140"><div class="img-caption">' + item.desc + '</div></a></div>';
                    });
                }
            }
        });

        return output;
    },
    renderProduct: function(data) {
        const output = [];

        if (data) {
            output.push('<div class="text-ref-set"><ul>');
            data.forEach(function(info) {
                output.push('<li><a href="' + info.link + '" target="_blank" rel="noopener noreferrer"><img class="text-ref-icon" src=' + info.img + ' alt=' + info.title + '/>' + '<span class="text-ref-title">' + info.title + '</span>' + '</a></li>');
            });
            output.push('</ul></div>');
        }

        return output.join('');
    },
    render: function() {
        let description = '';
        
        const logo = [];
        const date = [];
        const name = [];
        let product = '';
        let logoContent = '';
        let dateContent = '';
        let nameContent = '';

        this.props.work.corp.forEach(function(data) {
            if (data.name) {
                name.push('<div class="text-title-italic">');
                name.push('<a target="_blank" rel="noopener noreferrer" href=' + data.url + '>' + data.name + '</a>');
                if (data.position || data.org) {
                    name.push('<span class="text-desc"> / ' + data.position + (data.org ? ', ' + data.org : '') + '</span>');
                }
                name.push('</div>');
            }
            if (data.date) {
                date.push('<p>' + data.date + '</p>');
            }
            if (data.logo) {
                logo.push('<img id="' + data.name + '" width="' + data.width + '" height="' + data.height + '" src="' + data.logo + '" alt="' + data.logoalt + '" />');
            }
        });

        description += this.renderExperience(this.props.work.experience);
        product = this.renderProduct(this.props.work.product);
        
        logoContent = logo.join('');
        dateContent = date.join('');
        nameContent = name.join('');

        var photo = '';
        if (this.props.work.photo) {
            photo = '<img src="' + this.props.work.photo.src + '" alt="' + this.props.work.photo.alt + '" width="' + this.props.work.photo.width + '" height="' + this.props.work.photo.height + '" /><a target="_blank" href="' + this.props.work.photo.url + '">' + this.props.work.photo.text + '</a>';
        }

        return (
            <div className="data-experience row">
                <div className="col-md-2 text-date">
                    <div dangerouslySetInnerHTML={{__html: dateContent}} />
                </div>
                <div className="col-md-8">
                    <blockquote className={this.props.work.hl} >
                        <div dangerouslySetInnerHTML={{__html: nameContent}} />
                        { this.props.work.refer && <div dangerouslySetInnerHTML={{__html: this.props.work.refer.text}} /> }
                        <ul className="text-desc">
                            <div dangerouslySetInnerHTML={{__html: description}} />
                        </ul>
                        { this.props.work.photo && <div dangerouslySetInnerHTML={{__html: photo}} />}
                        { this.props.work.awards && <AwardsList awards={this.props.work.awards} /> }
                        <br />
                        { this.props.work.media && <PressList press={this.props.work.media} /> }
                        <div dangerouslySetInnerHTML={{__html: product}} />
                    </blockquote>
                </div>
                <div className="col-md-2 img-nostyle">
                    <div dangerouslySetInnerHTML={{__html: logoContent}} />
                </div>
            </div>
        );
    },
});

const WorksContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {
        const works = [];
        this.state.data.forEach(function(work, index) {
            // need to keep key={index} to avoid the following warning
            // warning: Each child in a list should have a unique "key" prop.
            works.push(<Work work={work} key={index} />);
        });
        return (
            <div id="region-experience">
                <Header setID="experience" text="Work Experience" />
                <hr />
                {works}
                <br />
            </div>
        );
    },
});

export default WorksContainer;