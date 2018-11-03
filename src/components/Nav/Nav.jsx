import React, {Component} from 'react';
import './Nav.scss';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component{



render(){
    return (
        <div className="navp">
            <div className="navc"><Link className='navlinks' to='/'>LOGO !!!</Link></div>
            <div className="navc">
                <Link className='navlinks' to='/createepic'>Start an Epic !!!</Link>
                <Link className='navlinks' to='/'>Home</Link>
                <Link className='navlinks' to='/about'>About</Link>
                {/* <div className="loginsignup"> */}
                {
                    this.props.username ?
                    <Link className='navlinks' to='/profile'>Profile</Link> 
                    :
                    <Link className='navlinks' to='/login'>Login</Link>
                }
                {
                    this.props.username ?
                    null
                    :
                    <Link className='navlinks' to='/signup'>Signup</Link> 
                }
                {/* <Link className='navlinks' to='/login'>Login</Link>
                <Link className='navlinks' to='/signup'>Signup</Link> */}
                {/* </div> */}
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
export default withRouter(connect(mapStateToProps)(Nav));