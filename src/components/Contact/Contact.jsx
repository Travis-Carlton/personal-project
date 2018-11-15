import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {

    handleSubmit = (e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios.post('/api/send', {name,email,message}).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm();
                window.close();
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    resetForm(){
        document.getElementById('contact-form').reset();
    }


    style = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(90, 95, 110, 0.748)',
            height: '350px',
            width: '250px',
            margin: '0 auto',
            
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px auto',
            color: 'white'
        },
        input: {
            height: '30px',
            width: '200px',
            fontSize: '16px',
            background: 'rgba(80, 80, 80, 0.639)',
            color: 'white',
            fontFamily: "'Permanent Marker', cursive"
        },
        textarea: {
            height: '50px',
            width: '200px',
            fontSize: '16px',
            background: 'rgba(80, 80, 80, 0.639)',
            color: 'white',
            fontFamily: "'Permanent Marker', cursive"
        },
        label: {
            fontSize: '24px',
            textShadow: '5px 5px 1px black'
        },
        btn: {
            cursor: 'pointer',
            fontSize: '20px',
            background: 'rgba(0, 0, 0, 0.858)',
            boxShadow: '2px 2px 1px white',
            textShadow: '2px 2px 1px rgba(255, 255, 255, 0.459)',
            border: 'none',
            borderRadius: '10px 10px',
            color: 'white',
            fontFamily: "'Permanent Marker', cursive",
            width: '100px',
            height: '30px',
            transition: '.8s',
            marginTop: '10px'
        },
        
    }


    render() {
        return (
            <div style={{paddingTop:'50px'}}>
            <form style={this.style.form} id="contact-form" onSubmit={this.handleSubmit} method="POST">
                <div style={this.style.div} className="form-group">
                    <label style={this.style.label} for="name">Name</label>
                    <input style={this.style.input} type="text" className="form-control" id="name" />
                </div>
                <div style={this.style.div} className="form-group">
                    <label style={this.style.label} for="exampleInputEmail1">Email address</label>
                    <input style={this.style.input} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div style={this.style.div} className="form-group">
                    <label style={this.style.label} for="message">Message</label>
                    <textarea style={this.style.textarea} className="form-control" rows="5" id="message"></textarea>
                </div>
                <button style={this.style.btn} type="submit" className="btn btn-primary">Submit</button>
                
            </form>
            </div>
        );
    }
}