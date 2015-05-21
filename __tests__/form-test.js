
jest.dontMock('../js/list.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Firebase = require('firebase');
var App = require('../js/list.js');

var app = TestUtils.renderIntoDocument(<App />);

// elements
var inputBox = TestUtils.findRenderedDOMComponentWithClass(app, 'inputBox');

describe('Form', function() {

  it('Initial value of input box', function() {
    expect(inputBox.getDOMNode().value).toBe('');
  });
  it('Initial value of text state', function() {
    expect(app.state.text).toBe('');
  });

});
