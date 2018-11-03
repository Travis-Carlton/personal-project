import React, { Component } from 'react';
import './CreateEpic.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateBookName,updateBookCover,updateBooks} from '../../redux/reducer';

class CreateEpic extends Component {

    createBook = ()=>{
        const {bookname,bookcover} = this.props;
        bookname==='' || bookcover==='' ? 
        alert('Please fill in the fields')
        : 
        axios.post('/api/createbook', {bookname,bookcover}).then((res)=>{
            this.props.history.push('/')
            // console.log(res.data)
        }).catch(err => console.log(err)).then(()=>{
            axios.get('/api/data').then(res=>{
                this.props.updateBooks(res.data)
              })
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
                <button className='createButton' onClick={this.createBook}>Create Cover</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {bookname,bookcover} = iS;
    return {
        bookname,
        bookcover
    }
}

export default withRouter(connect(mapStateToProps, {updateBookCover,updateBookName,updateBooks})(CreateEpic));