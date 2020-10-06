
import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';
//import ChatContact from './ChatContact';
import '../css/SignUp.css';
import ChatContact from './ChatContact';
class ChatApp extends React.Component {
  socket = {};
  
  constructor(props) {
    debugger;
    console.log(props.match.params.name);
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
   // this.keypressHandler=this.keypressHandler.bind(this);
    
    // Connect to the server
    //this.socket = io(config.api, { query: `username=${props.username}` }).connect();
    this.socket = io(config.api, { query: `username=${props.match.params.name}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });  
  }
  sendHandler(message) {
    const messageObject = {
      username: this.props.match.params.name,
      message
    };

  //   let typing=document.getElementById('typing');
  //   this.socket.on('typing', { user: 'Someone', message: 'is typing...'  });
  //  this.socket.emit('notifyTyping', data  =>  { 
  //    typing.innerText  =  data.user  +  ' '  +  data.message;
  //     console.log(data.user  +  data.message);
  //     });

    // Emit the message to the server
    this.socket.emit('client:message', messageObject)
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container_chat">
        <h3>Consult Patients</h3>
        <ChatContact />
        <Messages messages={this.state.messages} />        
        <ChatInput  onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
 // username:this.props.match.params.mobile
};

export default ChatApp;
