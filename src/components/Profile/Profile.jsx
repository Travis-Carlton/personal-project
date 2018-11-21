import React, { Component } from 'react';
import './Profile.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateProfilePic} from '../../redux/reducer';
import ProfileContent from '../ProfileContent/ProfileContent';

class Profile extends Component {
constructor(){
    super();
    this.state = {
        hover: false,
        imageInput: false,
        uImage: '',
        contentShow: false,
    }
}

// componentDidMount(){
//     this.getUserContent();
// }

// getUserContent = ()=>{
//     axios.get(`/api/getusercontent/${this.props.userId}`).then(res=>{
//         console.log('>>>>>>>',res.data)
//         // this.setState({
//         //     usersBooks: res.data.userBooks,
//         //     usersPosts: res.data.userPosts
//         // })
//     })
// }

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

    style = {
        div: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
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
        const {lusername,first_name,last_name,bio,profilePic} = this.props;
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
                    <div style={{height:'10px'}}>{this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.editClicked}  className='editpic'>Edit</button>:null}</div>
                
                    <div style={this.style.div}><h2>Username: </h2><div>{lusername}</div></div>
                    <div style={this.style.div}><h2>Name: </h2><div>{first_name + ' ' + last_name}</div></div>
                    <div style={this.style.div}><h3>bio: </h3><div>{bio}</div></div>
                    <div style={{height:'10px'}}>
                    {this.state.imageInput?
                        <div className='editdiv'>
                            <input onChange={e=>this.handleChange('uImage',e.target.value)} placeholder='Image URL' type='text' />
                            <button onClick={this.submitNewPic} className='ceditpic'>Submit</button>
                            <button onClick={this.cancelClicked} className='cceditpic'>X</button>
                        </div>
                    :null}
                    </div>
                    <button className='toggleContent' onClick={this.showUserContent}>Content by: {lusername}</button>
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
                </div>
            </div>
        );
    }
}
function mapStateToProps(iS){
    const {userId,lusername,first_name,last_name,
            bio,profilePic,usersBooks,usersPosts}= iS;
    return {
        userId,
        lusername,
        first_name,
        last_name,
        bio,
        profilePic,
        usersBooks,
        usersPosts
    }
}

export default withRouter(connect(mapStateToProps, {updateProfilePic})(Profile))