import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import axios from 'axios';
import $ from 'jquery';
function generateTreeNodes(treeNode) {

  const arr = [];
  const key = treeNode.props.eventKey;


  $.ajax({
    async:false,
   url:"http://indiabiodiversity.org/taxon/listHierarchy",
   data:{
      classSystem:265799,
      id:key
   },
   success:(data)=>{
     data.map((item)=>{
         arr.push({ text:item.text, id: item.id });
     })
 }
})
/*
  for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  */
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

const Demo = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      treeData: [],
      checkedKeys: [],
    };
  },
  componentDidMount() {
    $.ajax({
     url:"http://indiabiodiversity.org/taxon/listHierarchy?classSystem=265799",
     success:(data)=>{
       this.setState({
         treeData:data,
         checkedKeys: ['0-0'],
       })
   }
 })
  },
  onSelect(info) {
    console.log('selected', info);
  },
  onCheck(checkedKeys) {
    console.log(checkedKeys);
    this.setState({
      checkedKeys,
    });
  },
  onLoadData(treeNode) {

    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 6);
        this.setState({
           treeData:treeData,
         });
        resolve();
      }, 500);
    });
  },
  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.text} key={item.id}>{loop(item.children)}</TreeNode>;
        }
        return (
          <TreeNode title={item.text} key={item.id} isLeaf={item.isLeaf}
            disabled={item.rank === 10}
          />
        );
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
      <div>
      
        <Tree
          onSelect={this.onSelect}
          checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
          loadData={this.onLoadData}
        >
          {treeNodes}
        </Tree>
      </div>
    );
  },
});
export default Demo;
