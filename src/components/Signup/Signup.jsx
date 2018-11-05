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


    username === '' || password === '' || cPass === '' || firstName === '' || lastName === '' ?
    alert('Please fill in the required fields')
    :
    cPass !== password ?
    alert('Password fields dont match')
    :
    axios.post('/api/signup', {username,password,firstName,lastName,bio,profilePic}).then((res) => {
        console.log('/////////---------',res.data)
        // const {user} = res.data;
        updateUsername(username);
        updateFirstName(firstName);
        updateLastName(lastName);
        updateBio(bio);
        updateProfilePic(profilePic);
        updateID(res.data.id);
        this.props.history.push('/');
    }).catch(err => console.log(err))
    
}

/// onChange functions  //////////
handleChange = (key, val) => {
    this.setState({
        [key]: val
    })
}

upPassword = (val)=>{
    this.setState({
        password: val
    })
}
upCPass = (val)=>{
    this.setState({
        cPass: val
    })
}
upFirst = (val)=>{
    this.setState({
        firstName: val
    })
}
upLast = (val)=>{
    this.setState({
        lastName: val
    })
}
upBio = (val)=>{
    this.setState({
        bio: val
    })
}
upProPic = (val)=>{
    this.setState({
        profilePic : val
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
                <label>Password: </label><input onChange={e=>this.upPassword(e.target.value)} type="password" maxLength='15' minLength='5' required/>
                <label>Confirm password: </label><input onChange={e=>this.upCPass(e.target.value)} type="password" maxLength='15' minLength='5' required/>
                <label>First Name: </label><input onChange={e=>this.upFirst(e.target.value)} type="text"/>
                <label>Last Name: </label><input onChange={e=>this.upLast(e.target.value)} type="text"/>
                <label>Bio: </label><textarea onChange={e=>this.upBio(e.target.value)} cols="50" rows="2"></textarea>
                <label>Profile Picture: </label><textarea onChange={e=>this.upProPic(e.target.value)} cols='50' rows='1'></textarea>                
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