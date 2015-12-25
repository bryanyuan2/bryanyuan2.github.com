var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON,
    htmlencode = require('htmlencode');

var Publication = React.createClass({
  propTypes: {
    publication: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      publication: {},
      key: 0
    };
  },
  render: function() {
    return (
      <div className="row-fluid">
        <div className="span2">
          <p>{this.props.publication.date}</p>
        </div>
        <div className="span10">
            <p>
              “<a target="_blank" href={this.props.publication.link}>{this.props.publication.name}</a>”<br />
              {this.props.publication.publication}<br />
              <i dangerouslySetInnerHTML={{__html: this.props.publication.authors}} />
            </p>
        </div>
      </div>
    );
  }
});

var PublicationsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var publications = [];
    this.state.data.forEach(function(publication, index) {
      publications.push(<Publication publication={publication} key={index} />);
    });
    return(
      <div>
        <h2>Publications</h2>
        <hr />
        {publications}
        <br />
      </div>
    );
  }
});


module.exports = PublicationsContainer;
