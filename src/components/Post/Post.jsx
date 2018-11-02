import React from 'react';
import './Post.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Post = (props) => {
    console.log('----------post',props)
    return (
        <div className="postp">
            <div className="postc">
                <div className='postcc'>{props.book.name}</div>
                
                <div><img src={props.book.image} alt=""/></div>
            </div>
        </div>
    );
};

function mapStateToProps(iS){
    const {books} = iS;
    return {
        books
    }
}

export default withRouter(connect(mapStateToProps)(Post));