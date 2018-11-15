import React, { Component } from 'react';
import './Home.scss';
import Post from '../Post/Post';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Home extends Component {
constructor(props){
    super();
}




    render() {
    // console.log('home-----', this.props.books[0])
        
        let mapBooks = this.props.books.map((book)=>{
            return (
               <div key={book.id} className="homec"><Post key={book.id} book={book} /></div>                
            )
        })
       
        

        return (
            <div className="homep">
               {/* <div className='leftcover'></div> */}
               
               {mapBooks}
               {/* <div className='rightcover'></div> */}
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {books} = iS;
    return {
        books
    }
}

export default withRouter(connect(mapStateToProps)(Home));
