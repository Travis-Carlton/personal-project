import React, {Component} from 'react';
import './Login.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { updateID, updateUsername, updateFirstName, 
    updateLastName, updateBio, updateProfilePic, updateLikedBooks, 
    updateLikedPages, updateUsersBooks, updateUsersPages, updateEmail } from '../../redux/reducer';


class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            showForgotPassword: false
        }
    }

    upUsername = (val)=>{
        this.setState({
            username: val
        })
    }
    upPassword = (val)=>{
        this.setState({
            password: val
        })
    }

    login = ()=>{
        const {updateID,updateUsername,updateFirstName,
            updateLastName,updateBio,updateProfilePic,updateEmail} = this.props;
        const {username, password} = this.state;
        
        !username || !password ?
        alert('Missing fields') 
        :
        axios.post('/api/login', {username, password})
        .then((res)=>{
            const {user} = res.data;
            // window.sessionStorage.setItem('user', JSON.stringify(user));
            // console.log('USER',res.data.user)
            updateUsername(user.username);
            updateFirstName(user.first);
            updateLastName(user.last);
            updateBio(user.bio);
            updateProfilePic(user.pic);
            updateEmail(user.email);
            updateID(user.id);
            // this.props.history.push('/');
            window.location.assign('/')
            // console.log('user id ------',user.id)
        })
        .catch(err => console.log(err))
        .then(()=>{
            const { userId, updateLikedBooks, updateLikedPages } =this.props;
            axios.get(`/api/alllikes/${userId}`).then(res=>{
            //   console.log('++++++++++',res.data)
              const {booklikes,postlikes} = res.data;
              updateLikedBooks(booklikes);
              updateLikedPages(postlikes);
            }).then(()=>{
                this.getUserContent()
            })
          })
        .catch(err => console.log(err))
        
    }

    getUserContent = ()=>{
        const { updateUsersBooks, updateUsersPages } = this.props;
        axios.get(`/api/getusercontent/${this.props.userId}`).then(res=>{
            // console.log('>>>>>>>',res.data)
            updateUsersBooks(res.data.userBooks)
            updateUsersPages(res.data.userPosts)
        })
      }

      toggleForgotPassword = ()=>{
        this.setState({ showForgotPassword: !this.state.showForgotPassword })
        // console.log(this.state.contentShow)
    }

render(){

    return (
        <div className="loginp">
                <h1>Login</h1>
            <div className="loginc">
             
                <label>Username: </label><input onChange={e=>this.upUsername(e.target.value)} type="text" required/>
                <label>Password: </label><input onChange={e=>this.upPassword(e.target.value)} type="password" required/>
                <div style={{height:'50px'}}><button onClick={this.toggleForgotPassword} className='fpbtn' >Forgot Password</button></div>
                <div style={{height:'50px'}}><button onClick={this.login}>Login</button></div>

                <div className={this.state.showForgotPassword?'showFP':'hideFP'}>
                        <ForgotPassword toggleForgotPassword={this.toggleForgotPassword} />
                </div>
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {userId} = iS;
    return {
       userId
    }
}

export default withRouter(connect(mapStateToProps, 
    { updateID, updateUsername, updateFirstName, updateLastName, 
        updateBio, updateProfilePic, updateLikedBooks, updateLikedPages, 
        updateUsersBooks, updateUsersPages, updateEmail })(Login));