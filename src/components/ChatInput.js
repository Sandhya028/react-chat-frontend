import React from 'react';

// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
class ChatInput extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);  
   // this.keypresshandler=this.keypressHandler.bind(this);
  }

    //  keypressHandler(event){
    //    debugger;
    //   event.preventDefault();
    //   let typing=document.getElementById('typing');
    //   this.socket.on('client:message', { user: 'Someone', message: 'is typing...'  });
    //   this.socket.emit('notifyTyping', data  =>  { 
    //   typing.innerText  =  data.user  +  ' '  +  data.message;
    //   console.log(data.user  +  data.message);
    //    });
    // }
  //     // Clear the input box
  //   this.setState({ chatInput: '' });

  //   // Call the onSend callback with the chatInput message
  //   this.props.onSend(this.state.chatInput);

  //   //  let typing=document.getElementById('typing');
  //   //   this.socket.emit('typing', { user: 'Someone', message: 'is typing...'  });
  //   //  this.socket.on('notifyTyping', data  =>  { 
  //   //    typing.innerText  =  data.user  +  ' '  +  data.message;
  //   //     console.log(data.user  +  data.message);
  //   //     });
  // }
  
  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Clear the input box
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }

  render() {
    return (
      //<form className="chat-input" onSubmit={this.submitHandler}>
     
         <form className="chat-input">
           <span id="typing"></span>
        <input type="text" onKeyPress={this.keypresshandler}
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
          <img src="https://image.flaticon.com/icons/svg/60/60525.svg" width="40" height="40" onClick={this.submitHandler}></img>
      </form>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
