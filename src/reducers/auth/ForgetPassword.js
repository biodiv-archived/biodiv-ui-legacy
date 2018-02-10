import React,{Component} from 'react';
import { Form, Text, Radio, RadioGroup, Select, Checkbox,Field } from 'react-form';
import {NavLink} from 'react-router-dom';

class ForgetPassword extends Component{

  constructor(){
    super()
  }
  handleSubmit(submittedValues){
    console.log(submittedValues);
     this.setState( { submittedValues } )
  }
  render(){
    return(
      <div className="container">
        <div className="col-sm-4"></div>
        <div style={{backgroundColor:'white'}} className="col-sm-4">
          <Form onSubmit={this.handleSubmit.bind(this)}>
              { formApi => (
                <form onSubmit={formApi.submitForm} id="form2">
                  <br />
                  <div className="row">
                    <div className="col-sm-3">
                          <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-sm-9">
                        <Text className="form-control" field="email" type="email" id="email" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                    </div>
                  </div>
                  <br />
                </form>
              )}
            </Form>

        </div>
        <div className="col-sm-4"></div>


      </div>
    )
  }
}

export default ForgetPassword
