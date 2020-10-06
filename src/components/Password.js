import React, { Component } from "react";

export default class Password extends Component {
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {}
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.submituserPasswordForm = this.submituserPasswordForm.bind(this);
  
      };
  
      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }
  
      submituserPasswordForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            debugger;
            let fields = {};
            console.log(this.props.match.params.id);
            console.log(this.state);
  
            fetch('https://localhost:44398/api/MediNetConsult/'+this.props.match.params.id+'?password='+ this.state.fields["Password"],{    
          method: 'put',
          headers: {      
          },  
      }).then((Response) => Response.json())
        .then((Result) => {
          debugger;
          if (Result.status == 'Success'){
           fields["Password"] = "";
            fields["ConfirmPassword"] = "";
            debugger;
            this.setState({fields:fields});
            alert("Succesfully Inserted !!!!!");
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
        if (!fields["Password"]) {
          formIsValid = false;
          errors["Password"] = "*Please enter your password.";
        }
  
        if (typeof fields["Password"] !== "undefined") {
          if (!fields["Password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["Password"] = "*Please enter secure and strong password.";
          }
        }
  
        if (!fields["ConfirmPassword"]) {
          formIsValid = false;
          errors["ConfirmPassword"] = "*Please enter your Confirm password.";
        }
  
        if (typeof fields["ConfirmPassword"] !== "undefined") {
          if (fields["ConfirmPassword"]!==fields["Password"]) {
            formIsValid = false;
            errors["ConfirmPassword"] = "*Password Not Match.";
          }
        }
   
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    render() {
        return (
            <form method="post"  name="userPasswordForm"  onSubmit= {this.submituserPasswordForm}>
                <h3>Medinet Password</h3>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="Password" value={this.state.fields.Password} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.Password}</div>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Enter Confirm password" name="ConfirmPassword" value={this.state.fields.ConfirmPassword} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>               
            </form>
        );
    }
}