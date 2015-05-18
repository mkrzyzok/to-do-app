
var App = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return ({ items: [] });
  },

  componentWillMount: function() {
    var FirebaseRef = new Firebase('https://list-to-do-app.firebaseio.com/items');
    this.bindAsArray(FirebaseRef, 'items');
  },

  render: function() {
    return (
      <div>
        <AppBanner />
        <AppList items={ this.state.items }/>
      </div>
    );
  }
});

var AppList = React.createClass({
  showItem: function(item, index) {
    return <li key={index}>{item.text}</li>;
  },

  render: function() {
    return (
      <ul>{ this.props.items.map(this.showItem) }</ul>
    );
  }
});

var AppBanner = React.createClass({
  render: function() {
    return (
      <h1>What to do in my awesome day time?</h1>
    );
  }
});

React.render(<App />, document.getElementById('app'));
