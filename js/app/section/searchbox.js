'use strict';

const React = require('react');
const _ = require('lodash');
const LoadJSON = require('./../utils/mixins').LoadJSON;
const PureRenderMixin = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const SearchBox = createReactClass({
    mixins: [PureRenderMixin],
    propTypes: {
        items: PropTypes.object,
    },
    getDefaultProps: function() {
        return {
            items: {},
        };
    },
    sa_input: function() {
    
        var query_elem = document.getElementById('searchbox');
        var query = query_elem.value;

        var saContent = document.querySelector('#search-assist-content');
        var sbxcontainer = document.querySelector('#sbxcontainer');

        if (query) {
            var sa_data = this.props.items[0];
            saContent.innerHTML = "";

            for (var i = 0; i < sa_data.length; i++) {
                var curr_sa = sa_data[i];

                // if match the assist content
                if (curr_sa.entity.toLowerCase().includes(query.toLowerCase())) {
                    var elem = document.createElement("li");

                    var left_cont = document.createElement("div");
                    var cir_elem = document.createElement("div");
                    var img_elem = document.createElement("div");

                    left_cont.setAttribute('class', 'sa-img-ctn');
                    cir_elem.setAttribute('class', 'sa-thumb-icon');
                    img_elem.setAttribute('class', 'default-icon');
                    
                    var text_elem = document.createElement("span");
                    var desc_elem = document.createElement("p");

                    var curr = curr_sa.entity;
                    var curr_focus_entity = curr.replaceAll(query, '<strong>' + query + '</strong>');
                    text_elem.innerHTML = curr_focus_entity;

                    desc_elem.innerHTML = curr_sa.desc;

                    cir_elem.appendChild(img_elem);
                    left_cont.appendChild(cir_elem);
                    elem.appendChild(left_cont);
                    elem.appendChild(text_elem);
                    elem.appendChild(desc_elem);

                    saContent.appendChild(elem);

                    // show sa-content
                    saContent.classList.remove("hide");

                    // focus
                    saContent.classList.add("sb-shadow");

                    sbxcontainer.classList.add("sb-bottom-lr-reset");
                    sbxcontainer.classList.add("sb-shadow");
                }
            }
        } else {
            saContent.classList.add("hide");

            // un-focus
            saContent.classList.remove("sb-shadow");
            sbxcontainer.classList.remove("sb-shadow");   
            sbxcontainer.classList.remove("sb-bottom-lr-reset");         
        }
    },

    render: function() {
        return (
            <div className="data-searchbox">
                <div id="sbxcontainer" className="sbx">
                    <input className="sbq" id="searchbox" type="text" name="search" onKeyUp={this.sa_input} autocomplete="off" />
                </div>
                <ul id="search-assist-content" className="hide" ></ul>
            </div>
        );
    },
});

const SearchBoxContainer = createReactClass({
    mixins: [LoadJSON],
    render: function() {

        var items = [];
        var fullrecall = [];

        this.state.data.forEach(function(work, index) {
            items.push(work);
        });

        return (
            <div id="region-searchbox">
                <SearchBox items={items} />
            </div>
        );
    },
});

module.exports = SearchBoxContainer;
