import React, { Component } from 'react';
import './Profile.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateProfilePic} from '../../redux/reducer';

class Profile extends Component {
constructor(){
    super();
    this.state = {
        hover: false,
        imageInput: false,
        uImage: ''
    }
}
handleChange = (key, val) => {
    this.setState({
        [key]: val
    })
}

mouseEnter = () => {
    this.setState({ hover: true });
  }
mouseLeave = () => {
    this.setState({ hover: false });
  }
editClicked = () => {
    this.setState({ imageInput: true });
}
cancelClicked = () => {
    this.setState({ imageInput: false });
}

submitNewPic = () => {
    const {uImage} = this.state;
    const {userId, updateProfilePic} = this.props;
    // console.log('check', uImage)
    axios.patch(`/api/updatePic/${userId}`, {uImage}).then((res)=>{
        // console.log('/////----', res.data)
        updateProfilePic(res.data.image);
        // this.props.history.push('/profile');
        this.cancelClicked();
    })
}


    render() {
        // console.log('///////',this.props)
        const {lusername,first_name,last_name,bio,profilePic} = this.props;

        return (
            <div className="profilep">
                <div className="profilec">
                
                <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={profilePic} alt=""/>
                
                <div><h2>Username: </h2><div>{lusername}</div></div>
                <div><h2>Name: </h2><div>{first_name + ' ' + last_name}</div></div>
                <div><h3>bio: </h3><div>{bio}</div></div>
                {this.state.imageInput?<div className='editdiv'><input onChange={e=>this.handleChange('uImage',e.target.value)} placeholder='Image URL' type='text' /><button onClick={this.submitNewPic} className='ceditpic'>Submit</button><button onClick={this.cancelClicked} className='cceditpic'>X</button></div>:null}
                {this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.editClicked}  className='editpic'>Edit</button>:null}
                
                </div>
            </div>
        );
    }
}
function mapStateToProps(iS){
    const {userId,lusername,first_name,last_name,bio,profilePic}= iS;
    return {
        userId,
        lusername,
        first_name,
        last_name,
        bio,
        profilePic
    }
}

export default withRouter(connect(mapStateToProps, {updateProfilePic})(Profile))