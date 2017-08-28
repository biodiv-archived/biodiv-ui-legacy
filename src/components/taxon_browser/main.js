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


function generateTreeNodes(treeNode,classSystem) {
  const arr = [];
  const key = treeNode.props.eventKey;
  $.ajax({
    async:false,
   url:"http://indiabiodiversity.org/taxon/listHierarchy",
   data:{
      classSystem:classSystem,
      id:key
   },
   success:(data)=>{
     data.map((item)=>{
        console.log(item.taxonid)
         arr.push({ text:item.text, id: item.id,taxonid:item.taxonid});
     })
 }
})
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.id.length > curKey.length) ? item.id.indexOf(curKey) !== 0 :
        curKey.indexOf(item.id) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    //if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.id) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };

  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class Demo extends  React.Component{
constructor(){
  super();
  this.taxon;
  this.state={
    checkedKeys: [],
    classification:"265799"
  }
  this.onLoadData =this.onLoadData.bind(this);
  this.onCheck =this.onCheck.bind(this);
  this.onSelect =this.onSelect.bind(this);
}
  componentDidMount() {
    this.props.fetchTaxonList(this.state.classification);
  }

  onSelect(info,event) {
    this.props.ClearObservationPage();

    var event = new CustomEvent("getTaxon-filter",{ "detail":{
      taxon:event.node.props.taxonid,
      title:event.node.props.title,
      classification:this.state.classification

    }
  });

  document.dispatchEvent(event);

  }
  onCheck(checkedKeys,event) {
    console.log(checkedKeys)
    this.setState({
      checkedKeys
    })
  }



  onLoadData(treeNode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.props.treeData];

        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode,this.state.classification));
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

  render() {

    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.text} key={item.id} taxonid={item.taxonid}>{loop(item.children)}</TreeNode>;
        }
        return (
          <TreeNode  title={item.text} key={item.id} isLeaf={item.isLeaf}
            disabled={item.rank === 10} taxonid={item.taxonid}
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
            </div>


        <Tree
          onSelect={this.onSelect}
          checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
          loadData={this.onLoadData}
          showLine={true}
          showIcon={false}
        >
          {treeNodes}
        </Tree>

      </div>
    );
  }
};
function mapStateToProps(state){
return {
  treeData:state.treeData
};
}
export default connect(mapStateToProps,{fetchTaxonList,fetchObservations,ClearObservationPage})(Demo);
