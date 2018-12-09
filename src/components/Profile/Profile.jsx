import React, { Component } from 'react';
import './Profile.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// import {updateFirstName,updateLastName,
//     updateBio,updateProfilePic,updateEmail} from '../../redux/reducer';
import ProfileContent from '../ProfileContent/ProfileContent';
import EditProfile from '../EditProfile/EditProfile';

class Profile extends Component {
constructor(){
    super();
    this.state = {
        hover: false,
        imageInput: false,
        uImage: '',
        contentShow: false,
        profileEdit: false
    }
}

updateProfile = (firstName,lastName,bio,profilePic,email)=>{
    const {userId} = this.props;
    axios.put(`/api/profile/edit`, {userId,firstName,lastName,bio,profilePic,email})
    this.props.history.push('/login')
    
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
showUserContent = ()=>{
    this.setState({ contentShow: !this.state.contentShow })
    // console.log(this.state.contentShow)
}
showProfileEdit = ()=>{
    this.setState({ profileEdit: !this.state.profileEdit })
    // console.log(this.state.contentShow)
}

// submitNewPic = () => {
//     const {uImage} = this.state;
//     const {userId, updateProfilePic} = this.props;
//     // console.log('check', uImage)
//     axios.patch(`/api/updatePic/${userId}`, {uImage}).then((res)=>{
//         // console.log('/////----', res.data)
//         updateProfilePic(res.data.image);
//         // this.props.history.push('/profile');
//         this.cancelClicked();
//     })
// }

    style = {
        div: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    // changer = ()=>{
    //     setTimeout(()=>{
    //         this.state.hover === false?
    //         this.setState({ hover: true})
    //         :
    //         this.setState({ hover: false })
    //     }, 1000)
    // }

    render() {
        // console.log('///////',this.state.usersBooks)
        // console.log('///////',this.state.usersPosts)
        const {lusername,first_name,last_name,bio,profilePic,email} = this.props;
        // this.changer()
        const mapUsersBooks = this.props.usersBooks.map(book=>{
            return (
                <ProfileContent key={book.id} book={book} />
            )
        })
        const mapUsersPosts = this.props.usersPosts.map(post=>{
            return (
                <ProfileContent key={post.id} post={post} />
            )
        })

        return (
            <div className="profilep">
                <div className="profilec">
                
                    <div className="diamond">
                        <div className="dia">
                             <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={profilePic} alt=""/>
                        </div>
                    </div>    
                    <img id='mobilePicture' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={profilePic} alt=""/>

                    
                    {/* <div style={{height:'10px'}}>{this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.editClicked}  className='editpic'>Edit</button>:null}</div> */}
                    <div className='profileInfo'>
                        <div>
                            <div style={this.style.div}><h4 style={{borderBottom: '.5px solid white'}}>Username: </h4><div>{lusername}</div></div>
                            <div style={this.style.div}><h4 style={{borderBottom: '.5px solid white'}}>Name: </h4><div>{first_name + ' ' + last_name}</div></div>
                            <div style={this.style.div}><h4 style={{borderBottom: '.5px solid white'}}>Email: </h4><div>{email}</div></div>
                        </div>
                        <div className='profileBio'>
                            <div style={this.style.div}><h4 style={{borderBottom: '.5px solid white'}}>bio: </h4><div>{bio}</div></div>
                            <div style={{height:'10px'}}>
                            {/* {this.state.imageInput?
                                <div className='editdiv'>
                                    <input onChange={e=>this.handleChange('uImage',e.target.value)} placeholder='Image URL' type='text' />
                                    <button onClick={this.submitNewPic} className='ceditpic'>Submit</button>
                                    <button onClick={this.cancelClicked} className='cceditpic'>X</button>
                                </div>
                            :null} */}
                            </div>
                            <button className='toggleContent3' onClick={this.showProfileEdit}>Edit</button>
                            <button id='mobileContentBtn' onClick={this.showUserContent}>Content by: {lusername}</button>
                            
                        </div>
                    </div>
                    <button className='toggleContent' onClick={this.showUserContent}>Content by: {lusername}</button>

                      {/* content popup */}
                    
                    <div className={this.state.contentShow?'showContent':'hideContent'}>
                        <div className='showContentc'> 
                            <div className='showContentcc'>
                                {mapUsersBooks}
                            </div>
                           <hr/>
                            <div className='showContentcc'>
                                {mapUsersPosts}
                            </div>

                        </div>
                            <button className='toggleContent2'  onClick={this.showUserContent}>Close</button>
                    </div>

                    {/* edit profile popup */}

                    <div className={this.state.profileEdit?'profileEdit':'profileEditClosed'}>
                        <EditProfile {...this.props} updateProfile={this.updateProfile} toggleEdit={this.showProfileEdit}/>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(iS){
    const {userId,lusername,first_name,last_name,
            bio,profilePic,usersBooks,usersPosts,email}= iS;
    return {
        userId,
        lusername,
        first_name,
        last_name,
        bio,
        profilePic,
        usersBooks,
        usersPosts,
        email
    }
}

export default withRouter(connect(mapStateToProps)(Profile))