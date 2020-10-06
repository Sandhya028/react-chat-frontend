import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class SignOut extends React.Component {
    constructor() {
      super();
      this.state = {
       
      }
    };  

    componentDidMount(){
        debugger;
        sessionStorage.removeItem("UserName");
        sessionStorage.removeItem("UserId");
       //
      // window.location.reload(false);
        this.props.history.push('/sign-in');
        window.location.reload();
      }
  render() {
    return (   
        <h3>SignOut</h3>
      );
  }
}
export default SignOut;