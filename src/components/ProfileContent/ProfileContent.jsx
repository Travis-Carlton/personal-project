import React, { Component } from 'react';
import './ProfileContent.scss';

export default class ProfileContent extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render() {
        // console.log('profile content',this.props)
        const {book,post} = this.props;
        // const {}
        return (
            <div className='profileContentP'>
                <div className='profileContentC'>
                {this.props.book?
                    <>
                        <h2>{book.name}</h2>
                        <img src={book.image} alt=""/>
                    </>
                    :
                    <div>
                    <img className='contentPageImg' src={post.pimage} alt=""/>
                    <p>{post.dates}</p>
                    </div>
                    }
                   

                </div>
            </div>
        );
    }
}