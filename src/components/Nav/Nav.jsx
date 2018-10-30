import React from 'react';
import './Nav.scss';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navp">
            <div className="navc"><Link className='navlinks' to='/'>LOGO !!!</Link></div>
            <div className="navc">
                <Link className='navlinks' to='/createepic'>Start an Epic !!!</Link>
                <Link className='navlinks' to='/'>Home</Link>
                <Link className='navlinks' to='/about'>About</Link>
                {/* <div className="loginsignup"> */}
                <Link className='navlinks' to='/login'>Login</Link>
                <Link className='navlinks' to='/signup'>Signup</Link>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Nav;