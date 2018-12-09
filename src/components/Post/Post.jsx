import React, {Component} from 'react';
import './Post.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateBooks, updateLikedBooks, updateLikedPages, 
    updateUsersBooks, updateUsersPages } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            hover: false,
            toggle: false,
            count: '',
            likecount: '',
            // liked: false
        }
    }

      componentDidMount = ()=>{
          this.updatePageCount();
          this.updateLikeCount();
      }

    updatePageCount = ()=>{
        axios.get(`/api/${this.props.book.id}/pagecount`).then(res=>{
            this.setState({ count: res.data.count})
        })
    }
    updateLikeCount = ()=>{
        axios.get(`/api/${this.props.book.id}/likecount`).then(res=>{
            this.setState({ likecount: res.data.count})
            // console.log('-_____-',this.state.likecount)
        })
    }
    getAllLikes = ()=>{
        const { userId, updateLikedBooks, updateLikedPages } =this.props;
        axios.get(`/api/alllikes/${userId}`).then(res=>{
            // console.log('++++++++++',res.data)
        const {booklikes,postlikes} = res.data;
        let likedBooks = booklikes.map(el=>{
           return el.book_id;
         })
         // console.log('----',likedBooks)
          let likedPosts = postlikes.map(ele=>{
        return ele.post_id
         })
          // console.log('----',likedPosts)
           updateLikedBooks(likedBooks);
           updateLikedPages(likedPosts);
        })
    }


      
    mouseEnter = () => {
        this.setState({ hover: true });
      }
    mouseLeave = () => {
        this.setState({ hover: false });
      }
    

    deleteBook = ()=>{
        const {userId,lusername,book} = this.props;
        // console.log('-------',this.props)
        //// need to send id to back to compare????
        lusername !== 'TCaptain' && userId !== book.user_id?
        alert("Only the creator can delete their work")
        :
        axios.delete(`/api/deleteBook?booktodelete=${this.props.book.id}`).then(()=>{
            axios.get('/api/data').then(res=>{
                this.props.updateBooks(res.data);
                this.getUserContent();
              })
        })
       
    }
    getUserContent = ()=>{
        const { updateUsersBooks, updateUsersPages } = this.props;
        axios.get(`/api/getusercontent/${this.props.userId}`).then(res=>{
            // console.log('>>>>>>>',res.data)
            updateUsersBooks(res.data.userBooks)
            updateUsersPages(res.data.userPosts)
        })
      }

    likeBook = ()=>{
        const {id} = this.props.book;
        const {userId} = this.props
        !userId?
        alert('You need to be logged in to like this book!')
        :
        axios.post(`/api/booklike`, {id, userId}).then((res)=>{
            // console.log(res)
            this.getAllLikes();
         }).then(()=>{
          this.updateLikeCount();
         })

        }
    
    unlikeBook = ()=>{
        const {id} = this.props.book;
        const {userId} = this.props;
        // let likedBookId = this.props.book
        !userId?
        alert('You need to be logged in to unlike this book!')
        :
        axios.delete(`/api/bookunlike/${id}/${userId}`).then((res)=>{
            // console.log(res)
            this.getAllLikes();
         })
         .then(()=>{
          this.updateLikeCount();
         })
        }
    

    
    render(){
        // console.log('----------post',this.props)
        const { id, name, image } = this.props.book;
        const {likedBooks} = this.props;
        
        // let likes = this.props.likedBooks.map(el=>{
        //     return el.book_id
        // })
    return (
        <div className="postp">
            <div className="postc">
        
                <div className="postcc">{name}</div>
                
                <div>
                    <Link to={`/book/${id}/pages`} >
                        <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={image} alt=""/>
                    </Link>
                </div>
                <div className='footerdiv'>
                    <div>
                        <span className='postpages'>Pages: {this.state.count}</span>
                        <span >Likes: {this.state.likecount}</span>
                        {likedBooks.includes(id)?<span aria-labelledby="" role='img' onClick={this.unlikeBook} className='unlikebtn'>👎🏻</span>:<span aria-labelledby="" role='img' onClick={this.likeBook} className='likebtn'>👍🏻</span>}
                    </div>
                    {this.state.hover?
                        <>
                            <button onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.deleteBook} className='deleteBtn'>X</button>
                        </>
                        :
                            null}
                    <div className='mobiledelete'><button onClick={this.deleteBook} id='deleteBtnM'>X</button></div>
                </div>
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {userId,lusername,books,likedBooks} = iS;
    return {
        userId,
        lusername,
        books,
        likedBooks
    }
}

export default withRouter(connect(mapStateToProps, 
    {updateBooks, updateLikedBooks, updateLikedPages, 
        updateUsersBooks, updateUsersPages  })(Post));