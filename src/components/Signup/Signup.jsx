import React, {Component} from 'react';
import './Signup.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateID,updateUsername,updateFirstName,
    updateLastName,updateBio,updateProfilePic,updateEmail} from '../../redux/reducer';

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
            profilePic: '',
            email: ''
        }
    }

signUp = (e)=>{
    const {username,password,cPass,firstName,lastName,bio,profilePic,email} = this.state;
    const {updateID,updateUsername,updateFirstName,
        updateLastName,updateBio,updateProfilePic,updateEmail} = this.props;
    // username.length < 3 || password.length < 3 || cPass.length < 3 || firstName.length < 3 || lastName.length < 3 || email.length < 6 ?
    // alert('Please fill in the required fields')
    // :
    cPass !== password ?
    alert('Password fields dont match')
    :
    // axios.get(`/api/getusers?username=${username}`).then(()=>{
        
            // .then(()=>{
        e.preventDefault()
        axios.post('/api/signup', {username,password,firstName,lastName,bio,profilePic,email}).then((res) => {
            // console.log('/////////---------',res.data)
            // const {user} = res.data;
            if(res.data === 'username already exists'){
                alert('username already taken')
            } else {
                console.log(res.data)
                axios.post('/api/sendNewUser', {username,firstName,lastName,bio,profilePic,email})
                updateUsername(username);
                updateFirstName(firstName);
                updateLastName(lastName);
                updateBio(bio);
                updateProfilePic(res.data.user.profilePicture);
                updateID(res.data.user.id);
                updateEmail(email);
                // this.props.history.push('/');
                window.location.assign('/')
            }
        }).catch(err => console.log(err))
    }
    // .catch(()=>alert('Username is already taken'));
    


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
    // const {email,profilePic,cPass,password} = this.state;
    return (
        <form className="signupp" onSubmit={this.signUp}>
                <h1>SignUp</h1>
            <div className="signupc">
                <div className='signcc'>
                    <label>Username: </label><input placeholder='required' onChange={e=>this.handleChange('username', e.target.value)} type="text" maxLength='15' minLength='3' required/>
                    <label>Password: </label><input placeholder='required' onChange={e=>this.handleChange('password',e.target.value)} type="password" maxLength='15' minLength='3' required/>
                    <label>Confirm password: </label><input placeholder='required' onChange={e=>this.handleChange('cPass',e.target.value)} type="password" maxLength='15' minLength='3' required/>
                    <label>First Name: </label><input placeholder='required' onChange={e=>this.handleChange('firstName',e.target.value)} type="text" minLength='3' required/>
                    <label>Last Name: </label><input placeholder='required' onChange={e=>this.handleChange('lastName',e.target.value)} type="text" minLength='3' required/>
                </div>
                <div className='signcc'>
                    <label>Email: </label><input placeholder='required' onChange={e=>this.handleChange('email', e.target.value)} type="email" minLength='5' required/>
                    <label>Bio: </label><textarea onChange={e=>this.handleChange('bio',e.target.value)} cols="50" rows="2" />
                    <label>Profile Picture: </label><input onChange={e=>this.handleChange('profilePic',e.target.value)} type="url" minLength='5'/>             
                    <div className="buttonDivSpace"><input className='resetForm' type="reset" /></div>
                    {/* <br/> */}
                    <div className="buttonDivSpace"><input className='submitForm' type='submit' /></div>
                
                </div>                
            </div>
        </form>
    )};
};


function mapStateToProps(iS){
    const { loggedIn } = iS;
    return {
       loggedIn
    }
}

export default withRouter(connect(mapStateToProps, 
    {updateID,updateUsername,updateFirstName,updateLastName,
        updateBio,updateProfilePic,updateEmail})(Signup));