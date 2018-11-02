import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import routes from './routes';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateBooks} from './redux/reducer';

import Nav from './components/Nav/Nav';

class App extends Component {

componentDidMount(){
  
  axios.get('/api/data').then(res=>{
    // const {books} = this.props;
    console.log('app.js-----',res.data)
    this.props.updateBooks(res.data)
  })
}

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

function mapStateToProps(iS){
  const {books} = iS;
  return {
    books
  }
}

export default withRouter(connect(mapStateToProps, {updateBooks})(App));
