
var App = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return ({ items: [], text: '' });
  },
  setText: function(value) {
    this.setState({text: value});
  },
  componentWillMount: function() {
    var FirebaseRef = new Firebase('https://list-to-do-app.firebaseio.com/items');
    this.bindAsArray(FirebaseRef, 'items');
  },
  addItem: function() {
    if(this.state.text.trim().length !== 0)
    this.firebaseRefs.items.push({
      text: this.state.text
    });
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div>
        <AppBanner />
        <AppList items={ this.state.items } />
        <AppForm addItem={ this.addItem } setText={ this.setText } text={ this.state.text } />
      </div>
    );
  }
});

var AppList = React.createClass({
  showItems: function(item, index) {
    return (
      <li key={index}>{item.text}</li>
    );
  },
  render: function() {
    return (
      <ul>{this.props.items.map(this.showItems)}</ul>
    );
  }
});

var AppForm = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();
    this.props.addItem();
  },
  onChange: function(e) {
    this.props.setText(e.target.value);
  },
  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.onChange} type='text' value={this.props.text} />
        <input type='submit' value='Add' />
      </form>
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
