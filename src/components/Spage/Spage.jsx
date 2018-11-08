import React, {Component} from 'react';
import './Spage.scss';
import axios from 'axios';
import { connect } from 'react-redux';
// import { updateBooks } from '../../redux/reducer';
import { withRouter } from 'react-router-dom';

class Spage extends Component {
    constructor(){
        super();
        this.state = {
            hover: false,
            newPageInput: true,
            nextPage: []
        }
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

    createPage = ()=>{  

        const nextPage = this.state.nextPage[0];
        const {userId, getPages} = this.props;
        const {bookid} = this.props.match.params
        // axios.get('/api/data').then(res=>{

        // const {id} = res.data[res.data.length-1];
        // this.props.updateBooks(res.data);
        !this.props.lusername?
        alert('Need to be logged in to post')
        :
        axios.post('/api/createnextpage', { nextPage, userId, bookid  }).then(res=>{
            // console.log(res)
            getPages()
            // this.props.history.push(window.location.pathname);
            // axios.get(`/api/singleBook/${bookid}`)
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
        !this.props.lusername?
        alert('Need to be logged in to post')
        :
        window.cloudinary.openUploadWidget(
     { cloud_name: 'dgonb819t', upload_preset: 'shansi3g', folder: 'personalProject', multiple: 'false', autoMinimize: true, showCompletedButton: true },
          (error, result) => {
            if (result.info.secure_url) {
            //   This will Update gallery state with newly uploaded image
              let myNextPage = [...this.state.nextPage].concat(result.info.secure_url)
              this.setState({ nextPage: myNextPage })
              ///////////////////
            }
           
         }) 
        
     }

    
    render(){
        // console.log('```````````SPAGES',window)
    return (
        <div className="spagep">
            <div className="spagec">
        
                {this.props.pimage?<div className='spagecc'>Posted by: {this.props.username}</div>:null}
                
                <div>{this.props.pimage
                ?
                <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={this.props.pimage} alt=""/>
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

                {this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.deleteBook} className='deleteBtn'>X</button>:null}
                
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {userId,lusername,books} = iS;
    return {
        userId,
        lusername,
        books
    }
}

export default withRouter(connect(mapStateToProps)(Spage));

