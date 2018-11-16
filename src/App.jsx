import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import routes from './routes';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { updateID, updateBooks, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic } from './redux/reducer';
import Contact from './components/Contact/Contact';

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
  const {updateID,updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic} = this.props;
  axios.get('/api/auth').then(res=>{  
    const user = res.data;
    // console.log('appjs-------',user);
    if(user.username){
      updateUsername(user.username);
      updateFirstName(user.first);
      updateLastName(user.last);
      updateBio(user.bio);
      updateProfilePic(user.pic);
      updateID(user.id)
  }
}).then(()=>{
  const {userId} =this.props;
  axios.get(`/api/alllikes/${userId}`).then(res=>{
  console.log(res.data)

  })
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
    // console.log('------', this.props.userId)

    return (
      <div className="App">
        <div className="background-image">

          {window.location.pathname !== '/contact'?
          <>
          <Nav />
          {routes}
          </>
          :
          <Route path='/contact' render={()=><Contact/>}/>
          }
          

        </div>
      </div>
    );
  }
}

function mapStateToProps(iS){
  const {books,userId} = iS;
  return {
    books,
    userId
  }
}

export default withRouter(connect(mapStateToProps, {updateID, updateBooks, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic })(App));
