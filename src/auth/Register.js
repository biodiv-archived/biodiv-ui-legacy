import React,{Component} from 'react';
import { Form, Text, Radio, RadioGroup, Select, Checkbox,Field } from 'react-form';
import {NavLink} from 'react-router-dom';

import LocationSuggest from './LocationSuggest';

 const profession = [
   {
     label: 'Agriculture',
     value: 'Agriculture'
   },
   {
     label: 'Business',
     value: 'Business'
   },
   {
     label: "Education",
     value: 'Education'
   },
   {
     label: "Government",
     value: 'Government'
   },
   {
     label: "Research",
     value: 'Research'
   },
   {
     label: "Student",
     value: 'Student'
   },
   {
     label: "Other",
     value: 'Other'
   }
 ];
const institutions=[
    {
      label:"Corporation",
      value:"Corporation"
    },
    {
      label:"Government",
      value:"Government"
    },
    {
      label:"Non Government Organization",
      value:"Non Government Organization"
    },
    {
      label:"Educational Institution",
      value:"Educational Institution"
    },
    {
      label:"Other",
      value:"Other"
    }
];
 class BasicForm extends Component {

   constructor( props ) {
     super( props );
     this.state = {};
   }

   handleSubmit(submittedValues){
     console.log(submittedValues);
     this.setState({
       submittedValues
     })

   }

   render() {
     return (
       <div>
         <div className="container" style={{'backGroundColor':'white'}}>
           <div className="col-sm-2"></div>
           <div style={{backgroundColor: 'white'}} className="col-sm-8">
             <br />
             <div className="row">
             <div className="col-sm-4"></div>
             <div className="col-sm-4 col-xs-12">Already Have Account {' '}<NavLink to="/login">Login</NavLink> </div>

             </div>
             <br />
             <Form onSubmit={this.handleSubmit.bind(this)}>
               { formApi => (
                 <form onSubmit={formApi.submitForm} id="form2">
                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="name">Name</label>
                   </div>
                   <div className="col-sm-9">
                     <Text className="form-control" field="name" id="name" />
                   </div>
                   </div>
                   <br />

                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="name">Email</label>
                   </div>
                   <div className="col-sm-9">
                     <Text className="form-control" type="email" field="email" id="name" />
                   </div>
                   </div>
                   <br />
                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="name">Password</label>
                   </div>
                   <div className="col-sm-9">
                     <Text type="password" className="form-control" field="password" id="name" />
                   </div>
                   </div>
                   <br />
                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="name">Password Again</label>
                   </div>
                   <div className="col-sm-9">
                     <Text className="form-control" type="password" field="password2" id="name" />
                   </div>
                   </div>
                   <br />
                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="name">Gender</label>
                   </div>
                   <div className="col-sm-9">

                     <RadioGroup field="gender">
                       { group => (
                         <div>
                           <Radio group={group} value="male" id="male" className="mr-3 d-inline-block" />
                           <label htmlFor="male" className="mr-2">Male</label>
                           {'                 '}
                           <Radio group={group} value="female" id="female" className="d-inline-block" />
                           <label htmlFor="female" className="mr-2">Female</label>

                         </div>
                       )}
                     </RadioGroup>

                   </div>
                   </div>
                   <br />

                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="profession" className="d-block">Profession</label>
                   </div>
                   <div className="col-sm-9">
                      <Select className="form-control" field="profession" id="profession" options={profession} />
                   </div>
                   </div>
                   <br />
                   <div className="row">
                   <div className="col-sm-3">
                     <label htmlFor="institution" className="d-block">Institution</label>
                   </div>
                   <div className="col-sm-9">
                      <Select className="form-control" field="institution" id="institution" options={institutions} />
                   </div>
                   </div>
                    <br />
                   <div className="row">
                     <div className="col-sm-3"></div>
                     <div className="g-recaptcha col-sm-3" data-sitekey="6LcLZ0UUAAAAACnboBzcB4Jtab5DTjuFOqB_a_8m">
                     </div>
                   </div>
                    <br />
                   <div className="row">
                     <div className="col-sm-3"></div>
                     <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                  </div>
                  <LocationSuggest />

                 </form>
               )}
             </Form>
             <br />
           </div>
           <div className="col-sm-2"></div>
         </div>

       </div>
     );
   }
 }
 export default BasicForm
