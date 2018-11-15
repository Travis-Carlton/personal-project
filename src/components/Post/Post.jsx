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
            toggle: false,
            count: ''
        }
    }
    mouseEnter = () => {
        this.setState({ hover: true });
      }
    mouseLeave = () => {
        this.setState({ hover: false });
      }

      componentDidMount = ()=>{
        axios.get(`/api/${this.props.book.id}/pagecount`).then(res=>{
            // console.log(res.data)
            this.setState({ count: res.data.count})
        })
      }
    

    deleteBook = ()=>{
        const {userId,lusername,book} = this.props;
        console.log('-------',this.props)
        //// need to send id to back to compare????
        lusername !== 'TCaptain' && userId !== book.user_id?
        alert("Only the creator can delete their work")
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
        
                <div className="postcc">{name}</div>
                
                <div><Link to={`/book/${id}/pages`} ><img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={image} alt=""/></Link></div>
                <div className='footerdiv'><span>Pages: {this.state.count}</span>{this.state.hover?<><button onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.deleteBook} className='deleteBtn'>X</button></>:null}</div>
                
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

export default withRouter(connect(mapStateToProps, {updateBooks})(Post));