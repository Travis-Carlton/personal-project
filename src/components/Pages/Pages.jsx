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
        
        this.getPages()
    }

    getPages = () => {
        const {bookid} = this.props.match.params;
        axios.get(`/api/singleBook/${bookid}`).then(res=>{
            // console.log('-----------dataaaaa',res.data)
            this.setState({
                pages: res.data
            })
        })
    }

    render() {
        // console.log('-----pages', this.state.pages)
        let mapPages = this.state.pages.map((page)=>{
            console.log('-----pages',page)
            return (
               <div key={page.id} className="pagesc"><Spage pageId={page.id} username={page.username} date={page.dates} pimage={page.pimage} ></Spage></div>                
            )
        })
        return (
            <div className="pagesp">
                
                    {/* {this.state.pages?<img src={this.state.pages.image} alt=""/>:null} */}
                    {mapPages}
                    <Spage getPages={this.getPages.bind(this)}></Spage>
            </div>
        );
    }
}

export default Pages;