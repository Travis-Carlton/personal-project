import React, {Component} from 'react';
import './Post.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateBooks} from '../../redux/reducer';
import {withRouter} from 'react-router-dom';

class Post extends Component {

    deleteBook = ()=>{
        axios.delete(`/api/deleteBook?booktodelete=${this.props.book.id}`).then(()=>{
            axios.get('/api/data').then(res=>{
                this.props.updateBooks(res.data)
              })
        })
    }
    
    render(){
        // console.log('----------post',this.props)
    return (
        <div className="postp">
            <div className="postc">
        
                <div className='postcc'>{this.props.book.name}</div>
                
                <div><img src={this.props.book.image} alt=""/></div>
                <button onClick={this.deleteBook} className='deleteBtn'>X</button>
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {books} = iS;
    return {
        books
    }
}

export default withRouter(connect(mapStateToProps, {updateBooks})(Post));