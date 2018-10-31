import React, { Component } from 'react';
import './CreateEpic.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateBookName} from '../../redux/reducer';

class CreateEpic extends Component {

    createBook = ()=>{
        const {bookname} = this.props;
        axios.post('/createbook', {bookname}).then((res)=>{
            this.props.history.push('/')
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    render() {
        const {updateBookName} = this.props;
        console.log(this.props.bookname)
        return (
            <div className="createepicp">
                <div className="createepicc"> 
                <h1 className='createh1'>Name your<br/>Story</h1>
                <input onChange={e=>updateBookName(e.target.value)} type="text"/>
                <button onClick={this.createBook}>Create Name</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {bookname} = iS;
    return {
        bookname
    }
}

export default withRouter(connect(mapStateToProps, {updateBookName})(CreateEpic));