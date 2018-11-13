import React, { Component } from 'react';
import './Comments.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4000');


class Comments extends Component {
    constructor(){
        super();
        this.state = {
            message: '',
            fromServer:[],
            fromDB: []
        }
    }
    
    componentDidMount(){

        this.getPrevMsgs()

        socket.on('messageFromServer', message => {
            let update = [...this.state.fromServer, message]
            this.setState({
              fromServer: update
            })
          })

          
    }

    getPrevMsgs = ()=>{
        const { pageid } = this.props.match.params;
        axios.get(`/api/${pageid}/prevcomments`).then((res)=>{
        // console.log(res.data)
        this.setState({
            fromDB: res.data
        })

        })
    }

    sendMessage = () => {
        // console.log('sockets----', this.props)
        const {message} = this.state;
        const {userId, lusername} = this.props;
        const { pageid } = this.props.match.params;
        !userId || !lusername ?
        alert("Need to be logged in to post")
        :
        socket.emit('message', {message, userId, lusername, pageid});
        this.setState({ message: '' });
      }


    render() {

        const prevMessages = this.state.fromDB.map((msg)=>{
            // console.log(msg)
            return <div className={msg.user_id===this.props.userId?'usermsgbox':'msgbox'} key={msg.id}><div>{msg.comusername}:</div> <hr/> <div className="cmntfield">{msg.comment}</div></div>
            
        })

        const myMessages = this.state.fromServer.map((message,i) => {
            // console.log(message)
            // console.log(this.state.fromDB)
            return <div className={message.user_id===this.props.userId?'msgbox':'usermsgbox'} key={i}><div>{message.lusername}:</div> <hr/> <div className="cmntfield">{message.message}</div></div>
          })
          
        return (
            <div className='commentsp'>
                <div className="commentsc">
                    <div className='cmntsec'>
                        {prevMessages}
                        {myMessages}
                    </div>
                    <div className='cmntinput'>
                        <input value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} />
                        <button className="submitbtn" onClick={this.sendMessage}>submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(iS){
    const {userId,lusername} = iS;
    return {
        userId,
        lusername
    }
}

export default withRouter(connect(mapStateToProps)(Comments));