import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isLoaded:false,
      fields: {},
      errors: {},
      username: ''
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserHomeForm = this.submituserHomeForm.bind(this);

  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  componentDidMount(){
    debugger;
   // window.location.reload();
   sessionStorage.setItem("UserId",this.props.match.params.id); 
    fetch('https://localhost:44398/api/MediNetConsult/'+ this.props.match.params.id,{    
      method: 'Get',
      headers: {      
      },  
     }).then((Response) => Response.json())
      .then((Result) => {
        debugger;
        if (Result.status == 'Success'){           
          debugger;
               this.setState({
                 isLoaded:true,
                 data:Result.response
               })
               
            //  history.push("/Home");
            }
        else{
 alert('Sorrrrrry !!!! Un-authenticated User !!!!!')}
})  

// window.location.reload();
  }

  renderTableHeader() {
    if(this.state.data.length!=0)
    {
    let header = Object.keys(this.state.data[0])
    return header.map((key, index) => {
     // const {id,mobile,date}=key
      debugger;
       return (
        <th key={index}>{key.toUpperCase()}</th>                
       )
    })
  }
 
 }

  renderTableData() {
    return this.state.data.map((data, index) => {
       const { id ,date, mobile } = data //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{mobile}</td> 
             <td>{date}</td>
                         
          </tr>
       )
    })
 }



  submituserHomeForm(e) {
    debugger;
    e.preventDefault();
    if (this.validateForm()) {
        debugger;
        let fields = {};
        console.log(this.props.match.params.id);
        console.log(this.state);
       

        fetch('https://localhost:44398/api/MediNetConsult/ConsultList?regid='+ this.props.match.params.id +'&mobile='+this.state.fields["Mobile"],{    
      method: 'Post',
      headers: {      
      },  
  }).then((Response) => Response.json())
    .then((Result) => {
      debugger;
      if (Result.status == 'Success'){
       fields["Mobile"] = "";          
        debugger;
        this.setState({fields:fields});
        debugger;
        console.log(Result.mobile);
        this.setState({ username: Result.mobile });
       // alert("Succesfully Inserted !!!!!");
      // this.props.history.push("/Home/"+ Result.id +""); 
     // this.props.history.push("/ChatApp/"+Result.mobile+""); 
        
      //  return (
      //   <ChatApp username={this.state.username} />
      // );                        
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
    this.setState({
      errors: errors      
    });
    return formIsValid;
      }
  render() 
  {
    var {isLoaded,data}=this.state;
      if(!isLoaded){
        return (
         
            <div id="main-page">
          
           <div id="HomePage">
              <h2>Medinet Consult</h2>
              <form method="post"  name="userHomeForm"  onSubmit= {this.submituserHomeForm} > 
              <div className="row">
                <div className="col-sm-4">
                <i className="fa fa-envelope fa-6"> Mobile No: <input type="text" className="form-control" placeholder="Enter Mobile" id="mobileInput" name="Mobile" value={this.state.fields.Mobile} onChange={this.handleChange} /></i>         
                <button type="submit" className="button"><i className="fa fa-envelope fa-6"></i></button></div></div>
                <div className="errorMsg">{this.state.errors.Mobile}</div>
              </form>
              <h2>Previous Consult</h2>
               <div>Loading...</div>
          </div>
      </div>
            );
      }
      else{
        return (
          <div id="main-page">          
           <div id="HomePage">
              <h3>Medinet Consult</h3>
              <form method="post"  name="userHomeForm"  onSubmit= {this.submituserHomeForm} > 
              <div className="row">
                <div className="col-sm-4">
                <i className="fa fa-envelope fa-6"> Mobile No: <input type="text" className="form-control" placeholder="Enter Mobile" name="Mobile" value={this.state.fields.Mobile} onChange={this.handleChange} /></i>         
                <button type="submit" className="button_send"><i class="fa fa-envelope fa-6"></i></button></div></div>
                <div className="errorMsg">{this.state.errors.Mobile}</div>
              </form>
              <h3>Previous Consult</h3>
               <div class="homelistclass">
                <table id="HomeTable">
                 <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
  
               </div>
          </div>
      </div>
            );
      }
      
    }
}
export default Home;

