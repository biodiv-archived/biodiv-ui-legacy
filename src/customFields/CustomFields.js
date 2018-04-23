import React from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';
import {withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCustomFields} from './CustomFieldActions';
import CustomFieldsValues from './CustomFieldValues';
class CustomFields extends React.Component {

   constructor(){
    super();
    this.state={
        CustomFields:[]
    }

  }

  componentDidMount(){
    this.props.fetchCustomFields();
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        CustomFields:nextProps.CustomFields
      })

  }



  render() {
    let customFields=this.state.CustomFields;
    console.log(customFields);
    return (
      <div>
        {customFields.length>0?customFields.map((item,index)=>{
          return(
            <div key={index} >
              <Collapsible trigger={item.name} >
                  <CustomFieldsValues  groupId={item.userGroup.id} customFieldId={item.id} dataType={item.dataType} allowedMultiple={item.allowedMultiple} options={item.options} />
              </Collapsible>
            </div>

          )

        }):null}



      </div>
    )
  }
}

function mapStateToProps(state){

return {
CustomFields:state.CustomFields,
groupName:state.PublicUrl.groupName,
};
}
export default  withRouter(connect(mapStateToProps, {fetchCustomFields})(CustomFields));
