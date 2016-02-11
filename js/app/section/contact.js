"use strict";

var React = require('react'),
    LoadJSON = require('./../mixins').LoadJSON;

var Contact = React.createClass({
  propTypes: {
    contact: React.PropTypes.object,
    key: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      contact: {},
      key: 0
    };
  },
  shouldComponentUpdate: function() {
    // shouldComponentUpdate: function(nextProps, nextState)
    return false;
  },
  render: function() {
    return (
        <a target="_blank" href={this.props.contact.link}>
          <img width={this.props.contact.width} height={this.props.contact.height} className="header_icons" src={this.props.contact.icon} alt={this.props.contact.type} />
        </a>
    );
  }
});

var ContactsContainer = React.createClass({
  mixins: [LoadJSON],
  render: function() {
    var contacts = [];
    this.state.data.forEach(function(contact, index) {
      contacts.push(<Contact contact={contact} key={index} />);
    });
    return(
      <div id="regionContacts">
        <div>Download Curriculum vita <a target="_blank" href="https://github.com/bryanyuan2/bryanyuan2.resume/raw/master/ChengChunYuan_resume_v1.pdf">here</a></div>
        <hr />
        <div className="row header_icons_section">
          {contacts}
        </div>
        <br />
      </div>
    );
  }
});


module.exports = ContactsContainer;
