import React, {Component} from 'react';
import './Post.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateBooks } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';

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
        const {lusername} = this.props;
        //// need to send id to back to compare????
        !lusername?
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
        const { id, name, image } = this.props.book;
    return (
        <div className="postp">
            <div className="postc">
        
                <div className='postcc'>{name}</div>
                
                <div><Link to={`/book/${id}/pages`} ><img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={image} alt=""/></Link></div>
                {this.state.hover?<button onMouseEnter={this.mouseEnter} onClick={this.deleteBook} className='deleteBtn'>X</button>:null}
                
            </div>
        </div>
    )};
};

function mapStateToProps(iS){
    const {lusername,books} = iS;
    return {
        lusername,
        books
    }
}

export default withRouter(connect(mapStateToProps, {updateBooks})(Post));