import React, {Component} from 'react';
import './Nav.scss';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../redux/reducer';

class Nav extends Component{

logout = ()=>{
    const {clearUser} = this.props;
    // console.log('clicked')
    axios.post('/api/logout').then(()=>{
    // console.log('clicked')
        clearUser();
        // window.sessionStorage.clear();
    })
}

render(){
    return (
        <div className="navp">
            <div className="navc"><Link className='navlinks' to='/'>LOGO !!!</Link></div>
            <div className="navc">
                {
                    this.props.username ?
                    <Link className='navlinks' to='/createepic'>Start an Epic !!!</Link>
                    :
                    null
                }
                <Link className='navlinks' to='/'>Home</Link>
                <Link className='navlinks' to='/about'>About</Link>
                {
                    this.props.username ?
                    <Link className='navlinks' to='/profile'>Profile</Link> 
                    :
                    <Link className='navlinks' to='/login'>Login</Link>
                }
                {
                    this.props.username ?
                    <div onClick={()=>this.logout()} className='navlinks'>Logout</div>
                    :
                    <Link className='navlinks' to='/signup'>Signup</Link> 
                }
                
            </div>
        </div>
    )};
};
function mapStateToProps(iS){
    const {username} = iS;
    return {
        username
    }
}
export default withRouter(connect(mapStateToProps, {clearUser})(Nav));