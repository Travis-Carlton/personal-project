import React, {Component} from 'react';
import './Login.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {updateUsername, updatePassword} from '../../redux/reducer';

class Login extends Component{
    

    login = ()=>{
        const {username, password} = this.props;
        axios.post('/api/login', {username, password})
        .then((res)=>{
            this.props.history.push('/')
            console.log(res.data)
        }).catch(err => console.log(err))
    }

render(){
    console.log('login props',this.props)
    const {updateUsername,updatePassword} = this.props;
    return (
        <div className="loginp">
                <h1>Login</h1>
            <div className="loginc">
             
                <label>Username: </label><input onChange={e=>updateUsername(e.target.value)} type="text" required/>
                <label>Password: </label><input onChange={e=>updatePassword(e.target.value)} type="password" required/>
                <button onClick={this.login}>Login</button>
            
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {username,password} = iS;
    return {
        username,
        password
    }
}

export default withRouter(connect(mapStateToProps, {updateUsername,updatePassword})(Login));