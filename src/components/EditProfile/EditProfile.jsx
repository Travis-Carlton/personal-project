import React, { Component } from 'react';
import './EditProfile.scss';
// import axios from 'axios';
// import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
// import {updateFirstName,updateLastName,
//     updateBio,updateProfilePic,updateEmail} from '../../redux/reducer';

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            bio: '',
            profilePic: '',
            email: ''
        }
        
    }


handleChange = (key, val) => {
       this.setState({
        [key]: val
    })
}

    signUp = (e)=>{
        // console.log('he')
        const {firstName,lastName,bio,profilePic,email} = this.state;
        // const {userId} = this.props;
        this.props.updateProfile(firstName,lastName,bio,profilePic,email)
        }

        updateState = (e)=>{
        const {firstName,lastName,bio,profilePic,email} = this.state;
            // console.log(this.props)

            if(window.confirm('Any blank fields will default to previous entries! \n Do you wish to continue?')){
                alert(`You'll have you to log back in for the changes to take effect`)
                this.setState({
                    // username: username.length? username : this.props.lusername,
                    firstName: firstName.length? firstName : this.props.first_name,
                    lastName: lastName.length? lastName : this.props.last_name,
                    bio: bio.length? bio : this.props.bio,
                    profilePic: profilePic.length? profilePic : this.props.profilePic,
                    email: email.length? email : this.props.email
                })
                // e.preventDefault()
                

            } else return;
            

        }

    render() {
        const {firstName,lastName,bio,profilePic,email} = this.state;
        const {first_name,last_name} = this.props;
        // console.log('+++++++',this.props)
        return (
            <div>
                <form id='mobileEditProfile' className="signupp" onSubmit={this.signUp}>
                <h1 id='editProfileH1'>Edit Profile</h1>
            <div className="signupc">
                <div id='editProfileCC' className='signcc'>
                    {/* <label>Username: </label><input placeholder={lusername} value={username} onChange={e=>this.handleChange('username', e.target.value)} type="text" maxLength='15' minLength='3' required/> */}
                    <div><label>First Name: </label><input id='editProfilePlaceholder' placeholder={first_name} value={firstName} onChange={e=>this.handleChange('firstName',e.target.value)} type="text" minLength='3' required/></div>
                    <div><label>Last Name: </label><input id='editProfilePlaceholder' placeholder={last_name} value={lastName} onChange={e=>this.handleChange('lastName',e.target.value)} type="text" minLength='3' required/></div>
                    <div><label>Email: </label><input id='editProfilePlaceholder' placeholder={this.props.email} value={email} onChange={e=>this.handleChange('email', e.target.value)} type="email" minLength='5' required/></div>
                    <br/>
                </div>
                <div id='editProfileCC' className='signcc'>
                    <div><label>Profile Picture: </label><input id='editProfilePlaceholder' placeholder={this.props.profilePic} value={profilePic} onChange={e=>this.handleChange('profilePic',e.target.value)} type="url" minLength='5'/></div>
                    <div><label>Bio: </label><br/><textarea id='editProfilePlaceholder' placeholder={this.props.bio} value={bio} onChange={e=>this.handleChange('bio',e.target.value)} cols="50" rows="2" /></div>
                    {/* <div>Any fields left blank will default to previous entry</div> */}
                    <div className="buttonDivSpace"><input className='resetForm' type="reset" /></div>
                    {/* <br/> */}
                    <div className="buttonDivSpace"><input onClick={this.updateState} className='submitForm' type='submit' /></div>
                
                </div>                
            </div>
        </form>
                <button className='submitForm' onClick={this.props.toggleEdit}>Close</button>
            </div>
        );
    }
}

export default EditProfile;