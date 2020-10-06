import React, { Component } from 'react';

//import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/SignUp.css';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {},
          isChecked: false,
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  
      };
  
      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields,
          isChecked:!this.state.isChecked,
        });
  
      }
  
      submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            debugger;
            let fields = {};
            console.log(this.state);
            fetch('https://localhost:44398/api/MediNetConsult/SignUp?FirstName='+ this.state.fields["FirstName"] +'&LastName='+this.state.fields["LastName"] +'&Email='+this.state.fields["Email"] +'&MobileNumber='+this.state.fields["Mobile"]+'&providerNumber='+this.state.fields["ProviderNumber"]+'&IsActive='+ this.state.isChecked,{    
          method: 'post',
          headers: {      
          },  
      }).then((Response) => Response.json())
        .then((Result) => {
          debugger;
          if (Result.status == 'Success'){
           fields["FirstName"] = "";
            fields["LastName"] = "";
            fields["Email"] = "";
            fields["Mobile"] = "";
            fields["ProviderNumber"] = "";
            fields["IsActive"] = "";
            debugger;
            this.setState({fields:fields});
            alert("Succesfully Inserted !!!!!");
               this.props.history.push("/Password/"+ Result.id +"")                    
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
  
        if (!fields["FirstName"]) {
          formIsValid = false;
          errors["FirstName"] = "*Please enter your FirstName.";
        }
  
        if (typeof fields["FirstName"] !== "undefined") {
          if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["FirstName"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!fields["LastName"]) {
          formIsValid = false;
          errors["LastName"] = "*Please enter your LastName.";
        }
  
        if (typeof fields["LastName"] !== "undefined") {
          if (!fields["LastName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["LastName"] = "*Please enter alphabet characters only.";
          }
        }
  
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
  
        if (!fields["Mobile"]) {
          formIsValid = false;
          errors["Mobile"] = "*Please enter your mobile no.";
        }
  
        if (typeof fields["Mobile"] !== "undefined") {
          if (!fields["Mobile"].match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["Mobile"] = "*Please enter valid mobile no.";
          }
        }
  
        if (!fields["ProviderNumber"]) {
          formIsValid = false;
          errors["ProviderNumber"] = "*Please enter your ProviderNumber.";
        }  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
      }
    render() {
        return (
            <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm}>
                <h3>Medinet Sign Up</h3>
                
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name="FirstName" value={this.state.fields.FirstName} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.FirstName}</div>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="LastName" value={this.state.fields.LastName} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.LastName}</div>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="Email" value={this.state.fields.Email} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.Email}</div>
                </div>

                <div className="form-group">
                <label>Mobile No:</label>
                    <input type="text" className="form-control" placeholder="Enter Mobile" name="Mobile" value={this.state.fields.Mobile} onChange={this.handleChange}  />
                    <div className="errorMsg">{this.state.errors.Mobile}</div>
                </div>

                <div className="form-group">
                <label>Provider No:</label>
                    <input type="text" className="form-control" placeholder="Enter Provider Number" name="ProviderNumber" value={this.state.fields.ProviderNumber} onChange={this.handleChange}  />
                    <div className="errorMsg">{this.state.errors.ProviderNumber}</div>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" name="IsActive"  checked={this.state.isChecked} onChange={this.handleChange} />
                        <label className="custom-control-label" htmlFor="customCheck1">Is Active</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}