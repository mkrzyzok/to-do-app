
var App = React.createClass({
  render: function() {
    console.log('TEST');
    return(
      <h1>test</h1>
    );
  }
});

React.render(<App />, document.getElementById('app'));
