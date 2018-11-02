import React, { Component } from 'react';
import './CreateEpic.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateBookName,updateBookCover} from '../../redux/reducer';

class CreateEpic extends Component {

    createBook = ()=>{
        const {bookname,bookcover} = this.props;
        axios.post('/api/createbook', {bookname,bookcover}).then((res)=>{
            this.props.history.push('/')
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    render() {
        const {updateBookName,updateBookCover} = this.props;
        console.log(this.props.bookname)
        return (
            <div className="createepicp">
                <div className="createepicc"> 
                <h1 className='createh1'>Create your<br/>Story</h1>
                <span>Name: </span><input onChange={e=>updateBookName(e.target.value)} type="text"/>
                <span>Upload Image: </span><input onChange={e=>updateBookCover(e.target.value)} type='text'/>
                <button onClick={this.createBook}>Create Name</button>
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

export default withRouter(connect(mapStateToProps, {updateBookCover,updateBookName})(CreateEpic));