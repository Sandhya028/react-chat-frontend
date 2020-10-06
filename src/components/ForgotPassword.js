import React, { Component } from "react";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {}
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.submituserForgotPasswordForm = this.submituserForgotPasswordForm.bind(this);
  
      };
  
      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }
  
      submituserForgotPasswordForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            debugger;
            let fields = {};
            console.log(this.props.match.params.id);
            console.log(this.state);
  
            fetch('https://localhost:44398/api/MediNetConsult/ForGotPassword?Param='+ this.state.fields["Email"],{    
          method: 'Get',
          headers: {      
          },  
      }).then((Response) => Response.json())
        .then((Result) => {
          debugger;
          if (Result.status == 'Success'){
           fields["Email"] = "";
          // fields["Password"] = "";
            
            debugger;
            this.setState({fields:fields});
           // alert("Succesfully Inserted !!!!!");
               this.props.history.push('/sign-in');                    
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
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    render() {
        return (
            <form method="post"  name="userForgotPasswordForm"  onSubmit= {this.submituserForgotPasswordForm}>
                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="Email" value={this.state.fields.Email} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.Email}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>                
            </form>
        );
    }
}