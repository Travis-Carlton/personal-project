import React, {Component} from 'react';
import './Spage.scss';
import axios from 'axios';
import { connect } from 'react-redux';
// import { updateBooks } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';

class Spage extends Component {
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

    //   componentDidMount(){
    //       axios.get()
    //   }
    

    // deleteBook = ()=>{
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
    
    render(){
        console.log('```````````SPAGES',this.props)
    return (
        <div className="spagep">
            <div className="spagec">
        
                {this.props.pimage?<div className='spagecc'>Posted by: {this.props.username}</div>:null}
                
                <div>{this.props.pimage?<img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={this.props.pimage} alt=""/>:<button>Add Image</button>}</div>
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