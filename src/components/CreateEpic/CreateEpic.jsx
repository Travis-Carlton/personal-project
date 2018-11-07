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
            firstPage: ''
        }
    }

    createBook = ()=>{
        const {firstPage} = this.state;
        const {userId,bookname,bookcover} = this.props;
        !bookname || !bookcover || !firstPage ? 
        alert('Please fill in the fields')
        : 
        axios.post('/api/createbook', { userId, bookname, bookcover }).then(()=>{
            axios.get('/api/data').then(res=>{
                console.log('///////',res.data)
                console.log('--------',res.data[res.data.length-1].id)
                const {id} = res.data[res.data.length-1];
                this.props.updateBooks(res.data);
                axios.post('/api/createpage', { firstPage, userId, id  })
                // .then((responsepage)=>{
                //     // console.log('`````````',responsepage.data.postUser)
                //     updateUserForPosts(responsepage.data.postUser.username)
                // })
        }).then((res)=>{
            this.props.history.push('/')
        }).catch(err => console.log(err))
        })
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render() {
        const {updateBookName,updateBookCover} = this.props;
        // console.log(this.props.bookname)
        return (
            <div className="createepicp">
                <div className="createepicc"> 
                <h1 className='createh1'>Start your<br/>Epic</h1>
                <span>Title: </span><input onChange={e=>updateBookName(e.target.value)} type="text" required/>
                <span>Upload Cover Image: </span><input onChange={e=>updateBookCover(e.target.value)} type='text' required/>
                <span>Upload First Page: </span><input onChange={e=>this.handleChange('firstPage', e.target.value)} type='text' required/>
                <button className='createButton' onClick={this.createBook}>Start Epic</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {userId,bookId,bookname,bookcover} = iS;
    return {
        bookname,
        bookcover,
        userId,
        bookId,
        
    }
}

export default withRouter(connect(mapStateToProps, {updateBookCover,updateBookName,updateBooks})(CreateEpic));