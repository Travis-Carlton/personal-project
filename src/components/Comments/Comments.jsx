import React, { Component } from 'react';
import './Comments.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient();
// dev mode needs this 'http://localhost:4000' in above arg //


class Comments extends Component {
    constructor(){
        super();
        this.state = {
            message: '',
            fromServer:[],
            fromDB: [],
            typing: false
        }
    }
    
    componentDidMount(){

        this.getPrevMsgs()

        socket.on('messageFromServer', message => {
            let update = [...this.state.fromServer, message]
            this.setState({
              fromServer: update
            })
          });

        socket.on('userTyping', typer => {
            // console.log('--------new socket',typer)
            const {lusername} = this.props;
            if(typer.typingUser !== lusername){
                return this.setState({ typing: true})
                // if (typer.typingUser !== lusername && typer.erased){
                //     this.setState({ typing: false})
                // }
            } 
            // else {
            //     this.setState({ typing: false})
            // }
        })
        

          
    }

    getPrevMsgs = ()=>{
        const { pageid } = this.props.match.params;
        axios.get(`/api/${pageid}/prevcomments`).then((res)=>{
        // console.log('--------previous messages',res.data)
        this.setState({
            fromDB: res.data
        })

        })
    }

    sendMessage = () => {
        // console.log('sockets----', this.props)
        const {message} = this.state;
        const {userId, lusername, profilePic} = this.props;
        const { pageid } = this.props.match.params;
        !userId || !lusername ?
        alert("Need to be logged in to post")
        :
        socket.emit('message', {message, userId, lusername, profilePic, pageid});
        this.setState({ message: '', typing: false});
      }

      msgChange = (val)=>{
        //   console.log('msgchange', val)
          const {userId, lusername} = this.props;

          if(val.length){
              socket.emit('typing', {userId, lusername})
          } else if (!val.length){
              let erased = 0
              socket.emit('typing', {erased})
          }
        this.setState({message: val})
      }


    render() {
        // console.log(this.props)
        const prevMessages = this.state.fromDB.map((msg)=>{
            // console.log(msg)
            return <div className={msg.user_id===this.props.userId?'usermsgbox':'msgbox'} key={msg.id}>
                     <div className='picnuser'>
                        <img className='compic1' src={msg.compropic} alt=''/><p className='compuser'>{msg.comusername}</p>
                     </div> 
                    <hr/> 
                     <div className="cmntfield">{msg.comment}</div>
                </div>
            
        })

        const myMessages = this.state.fromServer.map((message,i) => {
            // console.log(message)
            // console.log(this.state.fromDB)
            return <div className={message.user_id===this.props.userId?'msgbox':'usermsgbox'} key={i}>
                     <div className='picnuser'>
                        <img className='compic1' src={message.profilePic} alt=''/> <p className='compuser'>{message.lusername}</p>
                     </div>
                    <hr/> 
                     <div className="cmntfield">{message.message}</div>
                </div>
          })
         
        return (
            <div className='commentsp'>
                <div className="commentsc">
                    <div className='cmntsec'>
                        {prevMessages}
                        {myMessages}
                    </div>
                    <div className='cmntinput'>
                        <div className={!this.state.typing?'notTyping':'isTyping'}>{this.props.lusername} is typing ...</div>
                        <input value={this.state.message} onChange={e=>this.msgChange(e.target.value)} />
                        <button className="submitbtn" onClick={this.sendMessage}>submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {userId,lusername,profilePic} = iS;
    return {
        userId,
        lusername,
        profilePic
    }
}

export default withRouter(connect(mapStateToProps)(Comments));