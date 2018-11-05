import React, {Component} from 'react';
import './Post.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateBooks} from '../../redux/reducer';
import {withRouter} from 'react-router-dom';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            hover: false,
        }
    }
    mouseEnter = () => {
        this.setState({ hover: true });
      }
    mouseLeave = () => {
        this.setState({ hover: false });
      }
    

    deleteBook = ()=>{
        const {username} = this.props;

        !username?
        alert("You need to be logged in to delete!")
        :
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
                
                <div><img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={this.props.book.image} alt=""/></div>
                {this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.deleteBook} className='deleteBtn'>X</button>:null}
                
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {username,books} = iS;
    return {
        username,
        books
    }
}

export default withRouter(connect(mapStateToProps, {updateBooks})(Post));