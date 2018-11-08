import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import routes from './routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateBooks, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic } from './redux/reducer';


import Nav from './components/Nav/Nav';

class App extends Component {

componentDidMount(){

  this.getData();
  this.getUser();
  
  // const user = JSON.parse(window.sessionStorage.getItem('user'));
  // console.log(user);
  // if(user){
  //   updateUsername(user.username);
  //   updateFirstName(user.first);
  //   updateLastName(user.last);
  //   updateBio(user.bio);
  //   updateProfilePic(user.pic);
  }

getUser = ()=>{
  const {updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic} = this.props;
  axios.get('/api/auth').then(res=>{  
    const user = res.data;
    // console.log('appjs-------',res.data);
    if(user.username){
      updateUsername(user.username);
      updateFirstName(user.first);
      updateLastName(user.last);
      updateBio(user.bio);
      updateProfilePic(user.pic);
  }
})
}

getData = ()=>{
  axios.get('/api/data').then(res=>{
    // const {books} = this.props;
    // console.log('app.js-----',res.data)
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

export default withRouter(connect(mapStateToProps, {updateBooks, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic })(App));
