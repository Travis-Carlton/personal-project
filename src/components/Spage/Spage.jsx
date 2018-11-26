import React, {Component} from 'react';
import './Spage.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateLikedBooks, updateLikedPages, 
    updateUsersBooks, updateUsersPages } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';

class Spage extends Component {
    constructor(){
        super();
        this.state = {
            hover: false,
            newPageInput: true,
            nextPage: [],
            count: '',
            pagelike: ''
        }
    }
    componentDidMount(){
       this.updateCommentCount();
       this.updateLikeCount();
      }

      updateCommentCount = ()=>{
        axios.get(`/api/page/${this.props.pageId}/commentcount`).then(res=>{
            //   console.log(res.data)
              this.setState({ count: res.data.count})
            })
      }

      updateLikeCount = ()=>{
        axios.get(`/api/page/${this.props.pageId}/pagelikecount`).then(res=>{
            // console.log('???????????',res)
            this.setState({ pagelike: res.data.count})
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

      toggleInput = ()=>{
          this.state.newPageInput === false?
            this.setState({
                newPageInput: true
            }):
            this.setState({
                newPageInput: false
            })
      }

 
      updatePage = (val)=>{
          this.setState({
              nextPage: val
          })
      }


    likePage = ()=>{
            const {userId,pageId} = this.props
            !userId?
            alert('You need to be logged in to like this page!')
            :
            axios.post(`/api/pagelike`, {userId,pageId}).then((res)=>{
                this.getAllLikes();
             }).then(()=>{
                this.updateLikeCount();
             })
            }
        

    unlikePage = ()=>{
            const {userId,pageId} = this.props
            !userId?
            alert('You need to be logged in to like this page!')
            :
            axios.delete(`/api/pageunlike/${pageId}/${userId}`).then((res)=>{
                this.getAllLikes();
             }).then(()=>{
                this.updateLikeCount();
             })
            }

      getTime = ()=>{
        let time = Date();
        let nT = time.split(' ');
        let hours = nT[4].split(':')
        if(hours[0]<=12){
            hours = hours.join(':');
            hours+= "am";
            let dT = nT.splice(0,6);
            dT[4] = hours;
            dT = dT.join(' ')
            // dT = JSON.stringify(dT)
            return dT
        } else if(hours[0]>12){
            hours[0] -= 12;
            hours[0] = JSON.stringify(hours[0])
            hours = hours.join(':')
            hours += "pm"
            let dT = nT.splice(0,6)
            dT[4] = hours
            dT = dT.join(' ')
            // dT = JSON.stringify(dT)
            return dT
        }
    }

    getUserContent = ()=>{
        const { updateUsersBooks, updateUsersPages } = this.props;
        axios.get(`/api/getusercontent/${this.props.userId}`).then(res=>{
            // console.log('>>>>>>>',res.data)
            updateUsersBooks(res.data.userBooks)
            updateUsersPages(res.data.userPosts)
        })
    }

    createPage = ()=>{  

        const nextPage = this.state.nextPage[0];
        const {userId, getPages, lusername} = this.props;
        const {bookid} = this.props.match.params;
        let uDT = this.getTime();
        // axios.get('/api/data').then(res=>{

        // const {id} = res.data[res.data.length-1];
        // this.props.updateBooks(res.data);
        !lusername?
        alert('Need to be logged in to post')
        :
        axios.post('/api/sendNewPage', { lusername, nextPage, userId, bookid }).then(()=>{
        
        axios.post('/api/createnextpage', { uDT, nextPage, userId, bookid }).then(res=>{
            // console.log(res)
            this.setState({ nextPage: []});
            getPages();
            this.getUserContent();
            // this.props.history.push(window.location.pathname);
            // axios.get(`/api/singleBook/${bookid}`)
            })
        })
    }

    

    // deletePage = ()=>{
    //     const {username} = this.props;
    //     //// need to send id to back to compare????
    //     !username?
    //     alert("You need to be logged in to delete!")
    //     :
    //     axios.delete(`/api/deleteBook?booktodelete=${this.props.book.id}`).then(()=>{
    //         axios.get('/api/data').then(res=>{
    //             this.props.updateBooks(res.data)
    //           })
    //     })
       
    // }

    
    uploadWidget = () => {
        // console.log('+++++++',window)
        !this.props.userId?
        alert('Need to be logged in to post')
        :
        window.cloudinary.openUploadWidget(
     { cloud_name: 'dgonb819t',
      upload_preset: 'shansi3g', 
      folder: 'personalProject', 
      multiple: 'false', 
      autoMinimize: true, 
      showCompletedButton: true,
      styles:{
        palette: {
          window: "#363636",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#FFFFFF",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link:  "#0078FF",
          action:  "#000000",
          inactiveTabIcon: "#FFFFFF",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#5a5f6e"
            },
        },
     },
          (error, result) => {
            if (result.info.secure_url) {
            //   This will Update gallery state with newly uploaded image
              let myNextPage = [...this.state.nextPage].concat(result.info.secure_url)
              this.setState({ nextPage: myNextPage })
              ///////////////////
            }
           
         }) 
        
     }
     
    

    //  let likes = this.props.likedPages.map(el=>{
    //      return el.post_id})
    
    render(){
        // console.log('```````````SPAGES', this.props);
        const {pageId,likedPages} = this.props;


    return (
        <div className="spagep">
            <div className="spagec">
        
                {this.props.pimage?
                <>
                <div className='spagecc'>Posted by: {this.props.username}</div>
                <div className='spagecc2'>{this.props.date}</div>
                </>
                :
                null}
                
                <div>{this.props.pimage
                ?
               <Link to={`/page/${this.props.pageId}/comments`} ><img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={this.props.pimage} alt=""/></Link>
                :
                <div>
                    <div className="upload">
                        {this.state.nextPage.length<1?
                        <div><button onClick={this.uploadWidget} className="upload-button">
                            Add Images
                        </button>
                        <div>If you upload more than one <br/>image, only the first one will be used.</div>
                        </div>
                        :
                        <div>
                        <button onClick={this.createPage} className='upload-button'>Submit</button>
                        <div>After file has been selected submit</div>
                        </div>
                        }
                    </div>
                </div>
                
                }</div>

                <div className='pagefooter'>
                    {this.props.pimage?
                        <div><span>Comments: {this.state.count}</span>
                            <span style={{marginLeft: '20px'}}>Likes: {this.state.pagelike}</span>
                            {likedPages.includes(pageId)?
                                <button onClick={this.unlikePage} className='unlikebtn'>-</button>
                            :
                                <button onClick={this.likePage} className='likebtn'>+</button>}
                        </div>
                        :
                        null}{this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.deleteBook} className='deleteBtn'>X</button>:null}</div>
                
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {userId,lusername,books,likedPages} = iS;
    return {
        userId,
        lusername,
        books,
        likedPages
    }
}


export default withRouter(connect(mapStateToProps, 
    { updateLikedBooks, updateLikedPages, updateUsersBooks, 
        updateUsersPages })(Spage));



