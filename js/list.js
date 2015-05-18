
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
    console.log(this.state.items);
    return(
      <div>
        <h1>What to do in my awesome day time?</h1>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
