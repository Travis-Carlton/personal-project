import React, { Component } from 'react';
import FunCards from './FunCards';
import axios from 'axios';
import './Fun.scss';

export default class Fun extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            randomFacts: '',
            gameTrivia: [],

        }
    }
    
    getFact = ()=>{
        axios.get('https://api.adviceslip.com/advice').then(res=>
        // console.log(res.data.slip.advice))
        this.setState({ randomFacts: res.data.slip.advice })
        )}
        componentDidMount(){
            axios.get('https://opentdb.com/api.php?amount=10&category=15&type=boolean').then((res)=>{
                // console.log(res.data.results)
                this.setState({ gameTrivia: res.data.results })
            })
        }

    newForm = ()=>{
        var myWindow = window.open('', '', 'width=500, height=500');
        
        myWindow.document.write(
            `
            <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
            <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
            <form style='background:grey;height:100%;width:100%;margin:0px;display:flex;flex-direction:column;justify-content:center;align-items:center;' id="contact-form" onSubmit={this.handleSubmit} method="POST">
                <div style='display:flex;flex-direction:column;justify-content:center;align-items:center;' className="form-group">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div style='display:flex;flex-direction:column;justify-content:center;align-items:center;' className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div style='display:flex;flex-direction:column;justify-content:center;align-items:center;' className="form-group">
                    <label for="message">Message</label>
                    <textarea className="form-control" rows="5" id="message"></textarea>
                </div>
                <button onClick={alert('hello')} style='background:darkslategrey;color:white;border-radius:5px 5px;border:none;transition:.8s;' onMouseOver="this.style.background='blue';this.style.height='50px';this.style.width='100px';this.style.transform='rotateY(360deg)'"
                onMouseOut="this.style.background='darkslategrey';this.style.height='25px';this.style.width='50px';this.style.transform='rotateY(0deg)'" type="submit" className="btn btn-primary">Submit</button>
            </form>

            `
        )
    }
    // translate = ()=>{
    //     const {sentence} 
    //     axios.post('https://yodish.p.mashape.com/yoda.json', {})
    // }

    // newForm2 = ()=>{
       
    //      window.open('./contact', '', 'width=500, height=500, left=550, top=200');
    //     console.log(window)
    //     // myWindow2.document.write()
    // }
    toggle = ()=>{
        this.state.showAnswer===false?
        this.setState({ showAnswer: true })
        :
        this.setState({ showAnswer: false })
    }


    render() {
        // console.log(this.state.name)
        const questions = this.state.gameTrivia.map(qs=>{
            return <FunCards qs={qs} />
        })
        
        return (
            <div>
                <button onClick={this.newForm}></button>
                <button onClick={this.getFact}></button>
                {/* <dialog open>hello</dialog> */}
                <div className="fun">{this.state.randomFacts}</div>
                <div>{questions}</div>
            </div>
        );
    }
}