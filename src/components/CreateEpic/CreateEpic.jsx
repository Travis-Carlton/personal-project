import React, { Component } from 'react';
import './CreateEpic.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateBookName,updateBookCover,updateBooks} from '../../redux/reducer';

class CreateEpic extends Component {
    constructor(){
        super();
        this.state = {
            // bookname: '',
            startingImages: []
        }
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

    createBook = ()=>{
        const {startingImages} = this.state;
        const {userId,bookname} = this.props;
        const bookcover = startingImages[0];
        const firstPage = startingImages[1];
        let uDT = this.getTime();
        
        userId === 0 || !bookname || !bookcover || !firstPage ? 
        alert('Please fill in the fields')
        : 
        axios.post('/api/sendNewBook', {userId,bookname,bookcover,firstPage}).then(()=>{

          axios.post('/api/createbook', { userId, bookname, bookcover }).then(()=>{
                axios.get('/api/data').then(res=>{
                    // console.log('///////',res.data)
                    // console.log('--------',res.data[res.data.length-1].id)
                    const {id} = res.data[res.data.length-1];
                    this.props.updateBooks(res.data);
                    axios.post('/api/createpage', { uDT, firstPage, userId, id  })
            }).then((res)=>{
                this.setState({startingImages: []});
                this.props.history.push('/');
            }).catch(err => console.log(err))
        })

        })
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    

    uploadWidget = () => {
        !this.props.userId?
        alert('Need to be logged in to post')
        :
        window.cloudinary.openUploadWidget(
     { cloud_name: 'dgonb819t', 
     upload_preset: 'shansi3g', 
     folder: 'personalProject', 
     maxFiles: 2, 
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
              let myStartingImages = [...this.state.startingImages].concat(result.info.secure_url)
              this.setState({ startingImages: myStartingImages })
              ///////////////////
            //   var widget = window.cloudinary.createUploadWidget({ 
            //     cloudName: "demo", uploadPreset: "preset1"}, (error, result) => { });
            //   widget.close({quiet: true});
            }
         })
         
     }
    //  LINK TO WIDGET DOCS: https://cloudinary.com/documentation/upload_widget
     

    render() {
        const {updateBookName} = this.props;
        // console.log(this.props.bookname)
        return (
            <div className="createepicp">
                <div className="createepicc"> 
                <h1 className='createh1'>Start your<br/>Epic</h1>
                <span className='createspan'>Title: </span><input onChange={e=>updateBookName(e.target.value)} type="text" required/>
                {/* <span>Upload Cover Image: </span><input onChange={e=>updateBookCover(e.target.value)} type='text' required/>
                <span>Upload First Page: </span><input onChange={e=>this.handleChange('firstPage', e.target.value)} type='text' required/> */}
                   {this.state.startingImages.length<2?
                   <div className="upload">
                    <button onClick={this.uploadWidget} className="upload-button">
                    Add Images
                    </button>
                    <div>The first page you upload will <br/>be the bookcover and the second <br/> will be the first page of the book</div>
                    </div>
                    :
                    <button className='upload-button' onClick={this.createBook}>Start Epic</button>
                    
                } 



                 {/* <div className="upload">
                     <button onClick={this.uploadWidget} className="upload-button">
                     Add Images
                     </button>
                 </div>
                <button className='upload-button' onClick={this.createBook}>Start Epic</button>
                 */}


                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {userId,bookId,bookname} = iS;
    return {
        bookname,
        userId,
        bookId,
        
    }
}

export default withRouter(connect(mapStateToProps, {updateBookCover,updateBookName,updateBooks})(CreateEpic));