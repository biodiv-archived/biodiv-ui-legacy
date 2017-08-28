import React,{Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {getAllUserGroup} from '../../Utils/Observations_API/index';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class TabsShow extends Component{
  constructor() {
    super();
      this.state = {
        tabIndex: 0,
        AllUserGroup:""

       };
    }

  render(){
    let data=[];
    {this.props.AllUserGroup?this.props.AllUserGroup.map((item)=>{
      data.push({
        value:item.name,
        label:item.name,
        icon:item.icon
      })
    }):null}
    return(
      <div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
         <TabList className="well well-sm">
           <Tab>Suggested ID</Tab>
           <Tab>Post To Group</Tab>
         </TabList>
         <TabPanel>

           <form className="form-group ">
             <div className="col-sm-11">
                <input type="text" className="form-control"></input>
             </div>
             <div className="col-sm-1">
                <button className="btn btn-primar pull-left">Add</button>
             </div>

             <div className="col-sm-11">
                <input type="text" className="form-control"></input>
             </div>
             <div className="col-sm-1">
                <button className="btn btn-primar pull-left">Add</button>
             </div> <div className="col-sm-11">
                 <input type="text" className="form-control"></input>
              </div>
              <div className="col-sm-1">
                 <button className="btn btn-primar pull-left">Add</button>
              </div>


           </form>

         </TabPanel>
         <TabPanel>
           <div>
             <Select
               name="form-field-name"

               options={data?data:null}
            
             />
           </div>
         </TabPanel>
       </Tabs>
      </div>
    )

  }
}
export default TabsShow
