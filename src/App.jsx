import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import routes from './routes';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { updateID, updateBooks, updateUsername, updateFirstName, 
  updateLastName, updateBio, updateProfilePic, updateLikedBooks, 
  updateLikedPages, updateUsersBooks, updateUsersPages, updateEmail } from './redux/reducer';
import Contact from './components/Contact/Contact';

import Nav from './components/Nav/Nav';

class App extends Component {

componentWillMount(){

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
  const {updateID,updateUsername,updateFirstName,
    updateLastName,updateBio,updateProfilePic,updateEmail} = this.props;
  axios.get('/api/auth').then(res=>{  
    const user = res.data;
    // console.log('appjs-------',res.data);
    if(user.username){
      updateUsername(user.username);
      updateFirstName(user.first);
      updateLastName(user.last);
      updateBio(user.bio);
      updateProfilePic(user.pic);
      updateEmail(user.email);
      updateID(user.id);
  }
})
.catch(err => console.log(err))
.then(()=>{
  const { userId, updateLikedBooks, updateLikedPages } =this.props;
  axios.get(`/api/alllikes/${userId}`).then(res=>{
    // console.log('++++++++++',res.data)
    const {booklikes,postlikes} = res.data;
    let likedBooks = booklikes.map(el=>{
      return el.book_id;
    })
    // console.log('----',likedBooks)
    let likedPosts = postlikes.map(ele=>{
      return ele.post_id
    })
    // console.log('----',likedPosts)
    updateLikedBooks(likedBooks);
    updateLikedPages(likedPosts);
  }).then(()=>{
    this.getUserContent();

  })
})
.catch(err => console.log(err))
}

getData = ()=>{
  axios.get('/api/data').then(res=>{
    // const {books} = this.props;
    // console.log('app.js-----',res.data)
    this.props.updateBooks(res.data)
  })
}
getUserContent = ()=>{
  const { updateUsersBooks, updateUsersPages } = this.props;
  axios.get(`/api/getusercontent/${this.props.userId}`).then(res=>{
      // console.log('>>>>>>>',res.data)
      updateUsersBooks(res.data.userBooks)
      updateUsersPages(res.data.userPosts)
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

export default withRouter(connect(mapStateToProps, 
  {updateID, updateBooks, updateUsername, updateFirstName,
     updateLastName, updateBio, updateProfilePic, updateLikedBooks, 
        updateLikedPages, updateUsersBooks, updateUsersPages, updateEmail })(App));
