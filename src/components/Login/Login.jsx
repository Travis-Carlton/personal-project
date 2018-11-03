import React, {Component} from 'react';
import './Login.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {updateUsername, updatePassword} from '../../redux/reducer';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    lclUsername = (val)=>{
        this.setState({
            username: val
        })
    }
    lclPassword = (val)=>{
        this.setState({
            password: val
        })
    }

    login = ()=>{
        const {updateUsername} = this.props;
        const {username, password} = this.state;
        axios.post('/api/login', {username, password})
        .then((res)=>{
            console.info(res.data.user.username)
            const {user} = res.data;
            updateUsername(user.username);
            this.props.history.push('/');
            console.log('--------',res.data.user.username);
        }).catch(err => console.log(err))
    }

render(){
    // console.log('login props',this.props)
    // const {updateUsername,updatePassword} = this.props;
    return (
        <div className="loginp">
                <h1>Login</h1>
            <div className="loginc">
             
                <label>Username: </label><input onChange={e=>this.lclUsername(e.target.value)} type="text" required/>
                <label>Password: </label><input onChange={e=>this.lclPassword(e.target.value)} type="password" required/>
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

export default withRouter(connect(mapStateToProps, {updateUsername,updatePassword})(Login));