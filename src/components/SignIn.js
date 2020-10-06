import React, { Component } from "react";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {}
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.submituserLoginForm = this.submituserLoginForm.bind(this);
  
      };
  
      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }
  
      submituserLoginForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            debugger;
            let fields = {};
            console.log(this.props.match.params.id);
            console.log(this.state);
  
            fetch('https://localhost:44398/api/MediNetConsult?Email='+ this.state.fields["Email"] +'&password='+this.state.fields["Password"],{    
          method: 'Get',
          headers: {      
          },  
      }).then((Response) => Response.json())
        .then((Result) => {
          debugger;
          if (Result.status == 'Success'){
           fields["Email"] = "";
           fields["Password"] = "";
            
            debugger;
            this.setState({fields:fields});
           // alert("Succesfully Inserted !!!!!");
               
               sessionStorage.setItem("UserName",Result.userProfile); 
               sessionStorage.setItem("FirstName",Result.name);
               console.log(sessionStorage.getItem("UserName")); 
               console.log(sessionStorage.getItem("FirstName"));
              // window.location.reload();
            //  window.location.reload(false);
               this.props.history.push("/Home/"+ Result.id +"");  
               window.location.reload();                
              }
          else{
   alert('Sorrrrrry !!!! Un-authenticated User !!!!!')}
  })          
        }
      }
      validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true; 
        
        if (!fields["Email"]) {
          formIsValid = false;
          errors["Email"] = "*Please enter your email-ID.";
        }
  
        if (typeof fields["Email"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["Email"])) {
            formIsValid = false;
            errors["Email"] = "*Please enter valid email-ID.";
          }
        }
  
        if (!fields["Password"]) {
          formIsValid = false;
          errors["Password"] = "*Please enter your password.";
        }
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    render() {
        return (
            <form method="post"  name="userLoginForm"  onSubmit= {this.submituserLoginForm}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="Email" value={this.state.fields.Email} onChange={this.handleChange}  />
                    <div className="errorMsg">{this.state.errors.Email}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="Password" value={this.state.fields.Password} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.Password}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/ForgotPassword">password?</a>
                </p>
            </form>
        );
    }
}