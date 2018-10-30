import React, { Component } from 'react';
import './App.scss';
import routes from './routes';

import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background-image">
          <Nav />
          {routes}
        </div>
      </div>
    );
  }
}

export default App;
