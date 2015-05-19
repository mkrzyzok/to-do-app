
/*!
 * TO DO APP
 */

var FirebaseRef = new Firebase('https://list-to-do-app.firebaseio.com/items');

var App = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return ({ items: [], text: '' });
  },
  setText: function(value) {
    this.setState({text: value});
  },
  componentWillMount: function() {
    this.bindAsArray(FirebaseRef, 'items');
  },
  addItem: function() {
    if(this.state.text.trim().length !== 0)
    this.firebaseRefs.items.push({
      text: this.state.text,
      check: false
    });
    this.setState({text: ''});
  },
  deleteItem: function(key) {
    console.log('Delete: ' + key);
    FirebaseRef.child(key).remove();
  },
  changeState: function(key, state) {
    var newState = !state;
    console.log('Change state:' + key + ' | ' + newState);
    FirebaseRef.child(key).update({
      check: newState
    });
  },
  render: function() {

    return (
      <div>
        <AppBanner />
        <AppList changeState={ this.changeState } deleteItem={ this.deleteItem } items={ this.state.items } />
        <AppForm addItem={ this.addItem } setText={ this.setText } text={ this.state.text } />
      </div>
    );
  }
});

var AppList = React.createClass({
  handleClick: function(obj) {
    this.props.changeState(obj.id, obj.check);
  },
  handleDelete: function(key) {
    this.props.deleteItem(key);
  },
  showItems: function(item, index) {
    return (
      <li>
        <button onClick={ this.handleDelete.bind(this, item.$id) }>x</button>
        <span
          style={ item.check ? {textDecoration: 'line-through'} : {textDecoration: 'none'} } 
          onClick={ this.handleClick.bind(this, { id: item.$id, check: item.check }) }
          key={item.$id}>
            {item.text}
        </span>
      </li>
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
