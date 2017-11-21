import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import axios from 'axios';
import $ from 'jquery';
import {connect} from 'react-redux';
import  queryString from 'query-string';
import _ from "lodash";
import  scrollIntoView  from 'dom-scroll-into-view';
import Dropdown from 'react-dropdown'

import 'rc-tree/assets/index.css';
import style from './style.css';

import {fetchTaxonList} from './TaxonBrowserActions';
import { Config } from '../Config';

class TaxonBrowser extends  React.Component{
constructor(){
  super();
  this.state={
    checkedKeys:[],
    classification:"265799",
    Expanded:[],
    Selected:[],
    current:0,
    showButton:[],
    title:[],
    classificationTable:[],
    classificationSelected:{ value: '265799', label: 'India Biodiversity portal '}
}
  this.onLoadData =this.onLoadData.bind(this);
  this.onCheck =this.onCheck.bind(this);
  this.onExpand =this.onExpand.bind(this);

  this.notDisplay={
    'display':'none'
  }

}

gettaxonData(){
    const newparams=  queryString.parse(document.location.search);
    let checkedKey=newparams.taxon?newparams.taxon.split(","):[];

    let newkey=newparams.taxon?newparams.taxon.split(","):[];
    let expand_taxon=undefined;
    let parent=undefined;
      if(checkedKey.length==1){
          if(checkedKey.includes("872")|| checkedKey.includes("122888")|| checkedKey.includes("2998")
          || checkedKey.includes("124658")|| checkedKey.includes("94899")|| checkedKey.includes("123467")||
          checkedKey.includes("64231")){
            this.props.fetchTaxonList(this.state.classification).then(()=>{
              this.setState({
                checkedKeys:checkedKey,
              },()=>{
                  this.setScrollClass();
              })
            });;
      }
      else{
          expand_taxon=true;
          parent=checkedKey.join(",")
          this.props.fetchTaxonList(this.state.classification,expand_taxon,parent).then((response)=>{
            this.setState({
              Expanded:response.payload.data[0].ids,
              checkedKeys:checkedKey,
            },()=>{
                this.setScrollClass();
            })
          });
      }
      }
      else if(checkedKey.length>1){
        expand_taxon=true;
      this.props.fetchTaxonList(this.state.classification,expand_taxon,checkedKey.join(",")).then((response)=>{
        this.setState({
          Expanded:response.payload.data[0].ids,
          checkedKeys:checkedKey,
        },()=>{
            this.setScrollClass();
        })
      });
      }
      else{
        this.props.fetchTaxonList(this.state.classification);
      }

}

getSearchNodeData(e){
let taxonToshow=e.detail.taxonValue;
let expand_taxon=true;
let taxonToshow1=taxonToshow.join(",");
taxonToshow1=taxonToshow1.split(",");
taxonToshow1= _.uniqBy(taxonToshow1);
this.props.fetchTaxonList(this.state.classification,expand_taxon,taxonToshow1).then((response)=>{

  this.setState({
    Expanded:response.payload.data?response.payload.data[0].ids:[],
    Selected:taxonToshow1[0].split(","),
    showButton:taxonToshow1
  },()=>{
      this.setScrollClass();
      var event = new CustomEvent("getTaxon-filter",{ "detail":{
        taxon:[],
        classification:this.state.classification
      }
    });
    document.dispatchEvent(event);
  })

});
}

nextFetch(){
  let selected=this.state.Selected[0];
  let showButton=this.state.showButton;
  let index=showButton.indexOf(selected);
  let size=showButton.length;
  index=index+1;
  index=index%size;
  if(index<=size && index>=0){
    this.setState({
      Selected:showButton[index].split(",")
    })
  }


}
prevFetch(){
  let selected=this.state.Selected[0];
  let showButton=this.state.showButton;
  let index=showButton.indexOf(selected);
  let size=showButton.length;
  index=index-1;
  index=index%size;
  if(index<=size && index>=0){
    this.setState({
      Selected:showButton[index].split(",")
    })
  }


}

setScrollClass(){

  let scrollTo = $('#container-sunil');

  if(scrollTo && scrollTo.offset()) {
   let myContainer = $('ul li .rc-tree-node-selected')
    let myContainer1=$('ul li .rc-tree-checkbox-checked');
    let title=[];
    if(myContainer1 && myContainer1.length){
      for(let i=0;i<myContainer1.length;i++){
        title.push(myContainer1[i].parentElement.innerText);
      }
    }

    if(myContainer.length){
       myContainer[0].scrollIntoView();
    }
    if(myContainer1.length){

       myContainer1[0].scrollIntoView();
    }

}

}
getClassificationData(){
  axios.get(`${Config.api.API_ROOT_URL}/taxon/classification/list`).then((response)=>{
    let data=[];
    response.data.map((item)=>{
      let obj={};
      obj.label=item.name;
      obj.value=item.id;
      data.push(obj);
    })
      this.setState({
      classificationTable:data
    })

  })
}
  componentDidMount() {
  this.getClassificationData();
  this.gettaxonData();
  document.addEventListener("getSearchNode", this.getSearchNodeData.bind(this));
  }

  componentWillunmount(){
  document.addEventListener("getSearchNode", this.getSearchNodeData.bind(this));
  }

generateTreeNodes(treeNode,classSystem,treeData,key) {
    const parent=treeNode.props.parent;
  const arr = [];
  $.ajax({
   url:`${Config.api.API_ROOT_URL}/taxon/list`,
   data:{
      classSystem:classSystem,
      parent:parent
   },

   success:(data)=>{
     data.map((item)=>{
          if(item){
         arr.push({ text:item.text, id: item.id,taxonid:item.taxonid,parent:item.parent,path:item.path,position:item.position,speciesId:item.speciesId});
          }
     })
     this.getNewTreeData(treeData,key,arr)
 }
})
}

 getNewTreeData(treeData, curKey, child) {
  const loop = (data) => {
    data.forEach((item) => {
      if (curKey.indexOf(item.path) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };

  loop(treeData);
  this.setState({
     treeData:treeData
   });

}

  onCheck(checkedKeys,event) {
    let checkedKey=checkedKeys.checked;
    this.setState({
      checkedKeys:checkedKey
    })
    var event = new CustomEvent("getTaxon-filter",{ "detail":{
      taxon:checkedKey,
      classification:this.state.classification
    }
  });
  document.dispatchEvent(event);
  event.preventDefault();

  }
  onExpand(expandedKeys){
    this.setState({
        Expanded:expandedKeys,
    })
  }

  onLoadData(treeNode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.props.treeData];
        this.generateTreeNodes(treeNode,this.state.classification,treeData,treeNode.props.path);
        this.setState({
           treeData:treeData,
         });
        resolve();
      }, 500);
    });
  }

  changeTaxonomy(data){
    this.props.fetchTaxonList(data.value);
     this.setState({
       classification:data.value,
       classificationSelected:data
     })
  }


  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return(
            <TreeNode className={item.position=="WORKING"?"colorBlue":item.position=="RAW"?"colorRed":item.position=="CLEAN"?"colorYellow":null} title={item.text}  path={item.path} parent={item.taxonid} key={item.taxonid} taxonid={item.taxonid}  position={item.position}
            speciesId={item.speciesId} >{loop(item.children)}</TreeNode>
          );
        }
        return (
          <TreeNode className={item.position=="WORKING"?"colorBlue":item.position=="RAW"?"colorRed":item.position=="CLEAN"?"colorYellow":null} title={item.text} key={item.taxonid} parent={item.taxonid} isLeaf={item.isLeaf}
           path={item.path} taxonid={item.taxonid} position={item.position} speciesId={item.speciesId}
          />
        );
      });
    };
    const treeNodes = loop(this.props.treeData);
    return (
            <div>
             <Dropdown options={this.state.classificationTable} value={this.state.classificationSelected} onChange={this.changeTaxonomy.bind(this)} placeholder="IBP" />
                <div id="container-sunil" className="pre-scrollable">
                <Tree
                  selectable={true}
                  multiple={true}
                  checkable={true}
                  onCheck={this.onCheck}
                  checkedKeys={this.state.checkedKeys}
                  loadData={this.onLoadData}
                  showLine={true}
                  showIcon={false}
                  checkStrictly={true}
                  onExpand={this.onExpand}
                  expandedKeys={this.state.Expanded}
                  selectedKeys={this.state.Selected}
                >
                  {treeNodes}
                </Tree >
                </div>
              <div>
               <button onClick={this.prevFetch.bind(this)} className={`btn btn-default btn-xs  ${this.state.showButton.length<2?"disabled":null}`}> <span className="glyphicon glyphicon-chevron-left">Prev</span></button>
               <button onClick={this.nextFetch.bind(this)} className={`btn btn-default btn-xs ${this.state.showButton.length<2?"disabled":null}`}><span className="glyphicon glyphicon-chevron-right">Next</span> </button>
              </div>

      </div>
    );
  }
};
function mapStateToProps(state){
return {
  treeData:state.treeData
};
}
export default connect(mapStateToProps,{fetchTaxonList})(TaxonBrowser);
