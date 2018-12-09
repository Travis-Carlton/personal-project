import React, {Component} from 'react';
import './Nav.scss';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../redux/reducer';

class Nav extends Component{
    constructor(){
        super();
        this.state = {
            showTabs: false
        }
    }

logout = ()=>{
    const {clearUser} = this.props;
    // console.log('clicked')
    axios.post('/api/logout').then(()=>{
    // console.log('clicked')
        clearUser();
        this.props.history.push('/');
        this.setState({showTabs: false});
        // window.sessionStorage.clear();
    })
}

toggleTabs = ()=>{
    this.setState({
        showTabs: !this.state.showTabs
    })
}

render(){
    return (
        <div className="navp">
            <div onClick={()=>{this.setState({showTabs: false})}} className="navc"><Link className='navlinksL' to='/' ><img className='logoimg' src="/images/tccomiclogov1.1.png" alt="ghjkh"/></Link></div>
            <div className="navc">
                {
                    this.props.lusername ?
                    <Link className='navlinks' to='/createepic'>Start an Epic !!!</Link>
                    :
                    null
                }
                <Link className='navlinks' to='/'>Home</Link>
                <Link className='navlinks' to='/about'>About</Link>
                {
                    this.props.lusername ?
                    <Link className='navlinks' to='/profile'>Profile</Link> 
                    :
                    <Link className='navlinks' to='/login'>Login</Link>
                }
                {
                    this.props.lusername ?
                    <div onClick={()=>this.logout()} className='navlinks'>Logout</div>
                    :
                    <Link className='navlinks' to='/signup'>Signup</Link> 
                }
                
            </div>
            <div className='mobileTabs'> 
                <span onClick={this.toggleTabs} className='openMobileTab' role='img'>🗯</span>
                <div className={this.state.showTabs ? 'tabList' : 'hideTabList'}>
                {
                    this.props.lusername ?
                    <Link onClick={this.toggleTabs} className='navlinks' to='/createepic'>Start an Epic !!!</Link>
                    :
                    null
                }
                <Link onClick={this.toggleTabs} className='navlinks' to='/'>Home</Link>
                <Link onClick={this.toggleTabs} className='navlinks' to='/about'>About</Link>
                {
                    this.props.lusername ?
                    <Link onClick={this.toggleTabs} className='navlinks' to='/profile'>Profile</Link> 
                    :
                    <Link onClick={this.toggleTabs} className='navlinks' to='/login'>Login</Link>
                }
                {
                    this.props.lusername ?
                    <div onClick={()=>this.logout()} className='navlinks'>Logout</div>
                    :
                    <Link onClick={this.toggleTabs} className='navlinks' to='/signup'>Signup</Link> 
                }
                </div>
            </div>
        </div>
    )};
};
function mapStateToProps(iS){
    const {lusername} = iS;
    return {
        lusername
    }
}
export default withRouter(connect(mapStateToProps, {clearUser})(Nav));