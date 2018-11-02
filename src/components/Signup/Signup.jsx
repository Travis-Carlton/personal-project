import React, {Component} from 'react';
import './Signup.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { clearState, updatePassword, updateUsername, updateFirstName, updateLastName, updateBio } from '../../redux/reducer';

class Signup extends Component {


signUp = ()=>{
    const {username,password,first_name,last_name,bio} = this.props;
    axios.post('/api/signup', {username,password,first_name,last_name,bio}).then(() => {
        // console.log(res.data)
        return clearState()
    }).then((res)=>{
        this.props.history.push('/')
        console.log(res.data)
    }).catch(err => console.log(err))
}

render(){
    console.log(this.props)
    const { updatePassword, updateUsername, updateFirstName, updateLastName, updateBio } = this.props;
    return (
        <div className="signupp">
                <h1>SignUp</h1>
            <div className="signupc">
                <div className='signcc'>
                <label>Username: </label><input onChange={e=>updateUsername(e.target.value)} type="text" maxLength='15' minLength='5' required/>
                <label>Password: </label><input onChange={e=>updatePassword(e.target.value)} type="password" maxLength='15' minLength='5' required/>
                <label>Confirm password: </label><input type="password" maxLength='15' minLength='5' required/>
                <label>First Name: </label><input onChange={e=>updateFirstName(e.target.value)} type="text"/>
                <label>Last Name: </label><input onChange={e=>updateLastName(e.target.value)} type="text"/>
                <label>Bio: </label><textarea onChange={e=>updateBio(e.target.value)} cols="50" rows="2"></textarea>
                <button onClick={this.signUp}>SignUp</button>
                
                </div>
               
               
                {/* <div className='signcc'>
                
                </div> */}
                
            </div>
        </div>
    )};
};


function mapStateToProps(iS){
    const { username, password, first_name, last_name, bio } = iS;
    return {
        username,
        password,
        first_name,
        last_name,
        bio
    }
}

export default withRouter(connect(mapStateToProps, { clearState, updatePassword, updateUsername, updateFirstName, updateLastName, updateBio })(Signup));