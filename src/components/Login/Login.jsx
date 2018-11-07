import React, {Component} from 'react';
import './Login.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { updateID, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic } from '../../redux/reducer';


class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
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
        const {updateID,updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic} = this.props;
        const {username, password} = this.state;
        
        !username || !password ?
        alert('Missing fields') 
        :
        axios.post('/api/login', {username, password})
        .then((res)=>{
            const {user} = res.data;
            // window.sessionStorage.setItem('user', JSON.stringify(user));
            console.log('USER',res.data.user)
            updateUsername(user.username);
            updateFirstName(user.first);
            updateLastName(user.last);
            updateBio(user.bio);
            updateProfilePic(user.pic);
            updateID(user.id);
            this.props.history.push('/');
            console.log('user id ------',user.id)
        })
        .catch(err => console.log(err))
        
    }

render(){

    return (
        <div className="loginp">
                <h1>Login</h1>
            <div className="loginc">
             
                <label>Username: </label><input onChange={e=>this.upUsername(e.target.value)} type="text" required/>
                <label>Password: </label><input onChange={e=>this.upPassword(e.target.value)} type="password" required/>
                <button onClick={this.login}>Login</button>
            
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {loggedIn} = iS;
    return {
       loggedIn
    }
}

export default withRouter(connect(mapStateToProps, { updateID, updateUsername, updateFirstName, updateLastName, updateBio, updateProfilePic })(Login));