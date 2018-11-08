import React, {Component} from 'react';
import './Signup.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateID,updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic} from '../../redux/reducer';

class Signup extends Component {
constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            cPass: '',
            firstName: '',
            lastName: '',
            bio: '',
            profilePic: ''
        }
    }

signUp = ()=>{
    const {username,password,cPass,firstName,lastName,bio,profilePic} = this.state;
    const {updateID,updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic} = this.props;
    // console.log(this.state)

    !username || !password || !cPass || !firstName || !lastName ?
    alert('Please fill in the required fields')
    :
    cPass !== password ?
    alert('Password fields dont match')
    :
    axios.get(`/api/getusers?username=${username}`).then(()=>{
        axios.post('/api/signup', {username,password,firstName,lastName,bio,profilePic}).then((res) => {
            // console.log('/////////---------',res.data)
            // const {user} = res.data;
            updateUsername(username);
            updateFirstName(firstName);
            updateLastName(lastName);
            updateBio(bio);
            updateProfilePic(profilePic);
            updateID(res.data.id);
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }).catch(()=>alert('Username is already taken'));
    
}

/// onChange functions  //////////
handleChange = (key, val) => {
    // console.log(key)
    // console.log(val)
    this.setState({
        [key]: val
    })
}
//////////////////////



render(){
    // console.log(this.props)
    // const { updatePassword, updateUsername, updateFirstName, updateLastName, updateBio } = this.props;
    return (
        <div className="signupp">
                <h1>SignUp</h1>
            <div className="signupc">
                <div className='signcc'>
                <label>Username: </label><input onChange={e=>this.handleChange('username', e.target.value)} type="text" maxLength='15' minLength='5' required/>
                <label>Password: </label><input onChange={e=>this.handleChange('password',e.target.value)} type="password" maxLength='15' minLength='5' required/>
                <label>Confirm password: </label><input onChange={e=>this.handleChange('cPass',e.target.value)} type="password" maxLength='15' minLength='5' required/>
                <label>First Name: </label><input onChange={e=>this.handleChange('firstName',e.target.value)} type="text"/>
                <label>Last Name: </label><input onChange={e=>this.handleChange('lastName',e.target.value)} type="text"/>
                </div>
                <div className='signcc'>
                <label>Bio: </label><textarea onChange={e=>this.handleChange('bio',e.target.value)} cols="50" rows="2"></textarea>
                <label>Profile Picture: </label><textarea onChange={e=>this.handleChange('profilePic',e.target.value)} cols='50' rows='1'></textarea>                
                <br/>
                <button onClick={this.signUp}>SignUp</button>
                
                </div>                
            </div>
        </div>
    )};
};


function mapStateToProps(iS){
    const { loggedIn } = iS;
    return {
       loggedIn
    }
}

export default withRouter(connect(mapStateToProps, {updateID,updateUsername,updateFirstName,updateLastName,updateBio,updateProfilePic})(Signup));