var Mixins = {
  LoadJSON : {
    getInitialState: function() {
      return {data: []};
    },
    loadData: function() {
      var that = this;
      $.getJSON(this.props.url, function(data) {
        that.setState({data: data});
      });
    },
    componentDidMount: function() {
        this.loadData();
    },
  }
}

module.exports = Mixins;
