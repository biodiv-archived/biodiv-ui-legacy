import React, {Component} from 'react';
import RecoName from '../components/Observation_Show/recoName.js'
import Traits from '../components/Observation_Show/traits.js'
import Formsuggest from '../components/Observation_Show/form.js'
import CustomFields from '../components/Observation_Show/customFields.js'
import CommentsFeeds from '../components/Observation_Show/commentsFeeds.js'

class Tabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Traitflag:0,
            Customflag:0

        }
    }

    setTrait(){
        this.setState({Traitflag:1});
    }

    setCustom(){
        console.log("setcalled")
            this.setState({Customflag:1});
    }

    render(){
        return(
                <div className="panel with-nav-tabs panel-default" id={this.props.objs.id}>

                    <div className="panel-heading">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href={"#"+this.props.objs.id+"_tab1"} data-toggle="tab">Suggest Id</a></li>
                            <li><a href={"#"+this.props.objs.id+"_tab2"} data-toggle="tab">Groups</a></li>
                            <li><a  href={"#"+this.props.objs.id+"_tab3"}  data-toggle="tab" data-tab-url={"#"+this.props.objs.id+"_tab3"} onClick={this.setTrait.bind(this)} >Traits</a></li>
                            <li><a href={"#"+this.props.objs.id+"_tab4"} data-toggle="tab" onClick={this.setCustom.bind(this)} >Custom fields</a></li>
                            <li><a href={"#"+this.props.objs.id+"_tab5"} data-toggle="tab">Comments</a></li>
                        </ul>
                    </div>

                    <div className="panel-body">
                        <div className="tab-content">
                            <div className="tab-pane fade in active" id={this.props.objs.id+"_tab1"}>

                                <div>
                                    <RecoName id={this.props.objs.id} isLocked={this.props.objs.isLocked}/>
                                </div>
                            </div>

                            <div className="tab-pane fade" id={this.props.objs.id+"_tab2"}></div>
                            <div className="tab-pane fade" id={this.props.objs.id+"_tab3"}> {this.state.Traitflag===1?<Traits id={this.props.objs.id} sGroup={this.props.objs.group.id} owner={this.props.objs.author.id}/>:null} </div>
                            <div className="tab-pane fade" id={this.props.objs.id+"_tab4"}>{this.state.Customflag===1?<CustomFields id={this.props.objs.id}/>:null}</div>
                            <div className="tab-pane fade" id={this.props.objs.id+"_tab5"}><CommentsFeeds id={this.props.objs.id}/></div>
                        </div>
                    </div>
                </div>

                )
    }
}
export default Tabs;
