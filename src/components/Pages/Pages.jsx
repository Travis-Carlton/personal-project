import React, { Component } from 'react';
import axios from 'axios';
import './Pages.scss';
// import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import Spage from '../Spage/Spage';

class Pages extends Component {
    constructor(){
        super();
        this.state = {
            pages: []
        }
    }

    componentDidMount(){
        const {bookid} = this.props.match.params;
        axios.get(`/api/singleBook/${bookid}`).then(res=>{
            console.log('-----------dataaaaa',res.data[0])
            this.setState({
                pages: res.data
            })
        })
    }

    render() {
        // console.log('-----pages', this.state.pages)
        let mapPages = this.state.pages.map((page)=>{
            // console.log('-----pages',page)
            return (
               <div key={page.id} className="pagesc"><Spage key={page.id} username={page.username} pimage={page.pimage}></Spage></div>                
            )
        })
        return (
            <div className="pagesp">
                
                    {/* {this.state.pages?<img src={this.state.pages.image} alt=""/>:null} */}
                    {mapPages}
                    <Spage></Spage>
            </div>
        );
    }
}

export default Pages;