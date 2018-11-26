import React, { Component } from 'react';
import './ForgotPassword.scss';
import axios from 'axios';

export default class ForgotPassword extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            correctValues: false
        }
    }

    checkDBforUser = (e)=>{
        const {username,email} = this.state;
        axios.get(`/api/${username}/${email}`).then(res=>{
            console.log(res.data)
            if(res.data === 'correct'){
                this.setState({correctValues: true})
            } else alert('Username or password didnt match anything in our database')
        })
        // e.preventDefault()
    }

    submitNewPassword = ()=>{
        const {password,confirmPass,username,email} = this.state;
        password !== confirmPass
        ?
        alert(`password fields don't match`)
        :
        axios.patch(`/api/newpassword`, {password,username,email}).then(res=>{
            // console.log(res.data)
            window.location.reload()
        })
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div className='forgotpasswordp'>
                {this.state.correctValues?
                 
                <div className='forgotpasswordc'>
                    <label>New Password</label>
                     <input onChange={e=>this.handleChange('password',e.target.value)} type="password" minLength='5' required/>
                    <label>Confirm New Password</label>
                     <input onChange={e=>this.handleChange('confirmPass',e.target.value)} type="password" minLength='5' required/>
                     <div className="btndiv"><button onClick={this.submitNewPassword}>Submit</button></div>
                </div>
                :
                <div className='forgotpasswordc'>
                 <h1>Forgot Password</h1>
                 <label>Username:</label>
                     <input onChange={e=>this.handleChange('username',e.target.value)} type="text" required/>
                 <label>Email:</label>
                     <input onChange={e=>this.handleChange('email',e.target.value)} type="email" required/>
                     <div className="btndiv"><button onClick={this.checkDBforUser} className='submitfp'>Submit</button></div>
                 </div>}
               
                <div className='exitdiv'>
                <button onClick={this.props.toggleForgotPassword} className='exitfp'>Exit</button>

                </div>
            </div>
        );
    }
}