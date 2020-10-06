import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from '../src/components/SignUp';
import Password from '../src/components/Password';
import Login from '../src/components/SignIn';
import ForgotPassword from '../src/components/ForgotPassword';
import SignOut from '../src/components/SignOut';
import Home from '../src/components/Home';
import SideBar from '../src/components/sidebar';
import ChatApp from '../src/components/ChatApp';
import VideoChat from '../src/components/VideoChat';
import Help from '../src/components/Help';

function App() {
  console.log(sessionStorage.getItem("UserId"));
  const isLogin = sessionStorage.getItem("UserName");
  if (isLogin != null) 
  {
    return(
      <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">           
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link">{sessionStorage.getItem("UserName")}</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-out"}>Sign Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> 
        <SideBar />
        <Switch>                        
            <Route path="/sign-out" component={SignOut} />                                    
        </Switch>
  
        <div className="auth-wrapper-home">
        <h4>WelCome To MediNet-Consults</h4>
          <div className="auth-inner-home">
          <Switch>
          <Route path="/Home/:id" component={Home} />
          <Route path='/ChatApp/:name' component={ChatApp} />
          <Route path='/VideoChat/:name' component={VideoChat} />
          <Route path='/Help' component={Help} />
          </Switch>           
          </div>
        </div>
       </div>    
      </Router>
    );
  }
  else{
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign In</Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
      <h4>WelCome To MediNet-Consults</h4>
        <div className="auth-inner">
        <Switch>           
            <Route path="/sign-in" component={Login} /> 
            <Route path="/sign-up" component={SignUp} />
            <Route path='/Password/:id' component={Password} />
            <Route path='/ForgotPassword' component={ForgotPassword} />
            {/* <Route path='/ChatApp/:name' component={ChatApp} /> */}
           
          </Switch>
         
        </div>
      </div>
    </div>    
    </Router>
  );
}
}

export default App;
