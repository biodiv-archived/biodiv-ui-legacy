import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import axios from 'axios';
import $ from 'jquery';
import {connect} from 'react-redux';
import {fetchObservations} from '../../actions/index';
import {fetchTaxonList} from '../../actions/index';
import {ClearObservationPage} from '../../actions/index';
import  queryString from 'query-string';
import _ from "lodash";
import style from './style.css';
import  scrollIntoView  from 'dom-scroll-into-view';
import {ROOT_URL} from '../../actions';

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
    title:[]
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
    let expand_taxon=undefined;
    let parent=undefined;

console.log("checkedKey",checkedKey)

    this.setState({
        checkedKeys:checkedKey,
        Expanded:checkedKey
    })

    if(checkedKey.length==1){
        if(checkedKey.includes("872")|| checkedKey.includes("122888")|| checkedKey.includes("2998")
        || checkedKey.includes("124658")|| checkedKey.includes("94899")|| checkedKey.includes("123467")||
        checkedKey.includes("64231")){

    this.props.fetchTaxonList(this.state.classification).then(()=>{
      this.setScrollClass();
    });

    }
    else{
        expand_taxon=true;
        parent=checkedKey.join(",")
        this.props.fetchTaxonList(this.state.classification,expand_taxon,parent).then(()=>{
        this.setScrollClass();

        });
    }
    }
    else if(checkedKey.length>1){
      expand_taxon=true;
    this.props.fetchTaxonList(this.state.classification,expand_taxon,checkedKey.join(",")).then((data)=>{

      this.setScrollClass();
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

this.setState({
  Expanded:taxonToshow1,
  Selected:taxonToshow1[0].split(","),
  showButton:taxonToshow1
})
this.props.fetchTaxonList(this.state.classification,expand_taxon,taxonToshow1[0]).then((data)=>{
  console.log(this.state.Selected)
  this.setScrollClass();
});



}

nextFetch(){
  let expand_taxon=true;
  let data=this.state.Expanded;

  let dataMax=data.length;
  let current=this.state.current;
  let parent = (dataMax + current + 1) % dataMax;
  this.props.fetchTaxonList(this.state.classification,expand_taxon,data[parent]).then((data)=>{
    this.setScrollClass();
  });
  let SelectedData=data[parent];
    SelectedData=SelectedData.toString();
    let Selected=SelectedData.split(",");
    current=current+1;
  this.setState({
    current,
    Selected
  })
}
prevFetch(){
  let expand_taxon=true;
  let data=this.state.Expanded;
  let dataMax=data.length;
  let current=this.state.current;
  let parent = (dataMax + current - 1) % dataMax;
  this.props.fetchTaxonList(this.state.classification,expand_taxon,data[parent]).then((data)=>{
    this.setScrollClass();
  });
 let SelectedData=data[parent];
    SelectedData=SelectedData.toString();
    let Selected=SelectedData.split(",");
    current=current-1;
  this.setState({
    current,
    Selected
  })

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

      this.setState({
        title
      },()=>{
         var event = new CustomEvent("getTaxon-filter",{ "detail":{
        noTaxon:false,
        title:title
        }
        });
        document.dispatchEvent(event);
      })
    }

    if(myContainer.length){
       myContainer[0].scrollIntoView();
    }
    if(myContainer1.length){

       myContainer1[0].scrollIntoView({});
    }

}

}
  componentDidMount() {
    this.gettaxonData();
  document.addEventListener("getSearchNode", this.getSearchNodeData.bind(this));

  }

  componentWillunmount(){
  document.addEventListener("getSearchNode", this.getSearchNodeData.bind(this));

  }

generateTreeNodes(treeNode,classSystem,treeData,key) {
    const parent=treeNode.props.path;
  const arr = [];
  $.ajax({
   url:`${ROOT_URL}/taxon/list`,
   data:{
      classSystem:classSystem,
      parent:parent
   },

   success:(data)=>{
     data.map((item)=>{
          if(item){
         arr.push({ text:item.text, id: item.id,taxonid:item.taxonid,parent:item.parent,path:item.path});
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
    this.props.ClearObservationPage();
    let checkedKey=checkedKeys.checked;
    this.setState({
      checkedKeys:checkedKey
    })
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",checkedKeys)

    var event = new CustomEvent("getTaxon-filter",{ "detail":{
      taxon:checkedKey,
      noTaxon:true,
      title:event.node.props.title,
      classification:this.state.classification,
      checked:event.checked,
      taxonRemoved:event.node.props.taxonid
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

  changeTaxonomy(event){
    this.props.fetchTaxonList(event.target.value);
    this.setState({
      classification:event.target.value
    })
  }
  handleSubmit(){
    console.log("changed")
  }


  componentDidReceiveProps(nextProps){
    console.log("received props")
  }

  render() {

    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.text}  path={item.path} key={item.taxonid} taxonid={item.taxonid}>{loop(item.children)}</TreeNode>;
        }
        return (

          <TreeNode  title={item.text} key={item.taxonid} isLeaf={item.isLeaf}
            disabled={item.rank === 10} path={item.path} taxonid={item.taxonid}
          />
        );
      });
    };
    const treeNodes = loop(this.props.treeData);
    return (
      <div>
          <div style={{paddingBottom:'0px',marginBottom:'0px'}} className="form-group form-inline"  >
            <select style={{width:'100%'}} onChange={this.changeTaxonomy.bind(this)}  className=" form-control" >
                <option  value="265799">IBP (India Biodiversity portal )</option>
                <option  value="819">IUCN Taxonomy Hierarchy </option>
                <option  value="818">GBIF Taxonomy  </option>
                <option  value="820"> FishBase Taxonomy Hierarchy  </option>
                <option  value="265798">Combined Taxonomy Hierarchy </option>
                <option  value="821">Catalogue of Life  </option>
                <option  value="817">Author Contributed </option>
             </select>
            </div >
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
export default connect(mapStateToProps,{fetchTaxonList,fetchObservations,ClearObservationPage})(TaxonBrowser);
