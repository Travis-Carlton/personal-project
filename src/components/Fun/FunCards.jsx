import React, { Component } from 'react';

export default class FunCards extends Component {
    constructor(){
        super();
        this.state = {
            showAnswer: false
        }
    }
    toggle = ()=>{
        this.state.showAnswer===false?
        this.setState({ showAnswer: true })
        :
        this.setState({ showAnswer: false })
    }
    render() {
        // console.log(this.props.qs)
        const {qs} = this.props;
        return (
            <>
                <div className='card'>
                <div style={{color: 'white',fontSize: '18px',margin: '0 auto'}}>{qs.question}</div>
                <button onClick={this.toggle}>Reveal Answer</button>
                <div className={this.state.showAnswer===true?'revealdiv':'answerdiv'} >{qs.correct_answer}</div>
                </div>  
            </>
        );
    }
}