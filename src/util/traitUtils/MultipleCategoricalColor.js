import React from 'react';
import { CompactPicker} from 'react-color';
import './TraitUtilStyle.css';

class ColorTrait extends React.Component {
  constructor(){
    super();
    this.state = {
      background: '#fff',
      color:null,
      selectedColor:[],
    };
    this.handleChangeComplete=this.handleChangeComplete.bind(this)
  }


  handleChangeComplete(color){
    //console.log(color.hsl);
    this.setState({
      background: color.hsl ,
      color:color.hex
    });
          let colorArray=[];
          colorArray.push(Math.trunc(color.hsl.h));
          colorArray.push(Math.trunc(color.hsl.s*100));
          colorArray.push(Math.trunc(color.hsl.l*100));
          //console.log("selected color",color)
          //this.props.passToTraitValues("color_hsl",this.props.traitId,colorArray);
  }

  pushColorToSelection(){
    let add;
    if(this.props.traitCategory === 'SINGLE_CATEGORICAL'){
      add = [];
    }else{
      add = this.state.selectedColor;
    }
    var a={};
    a.id=this.state.color
    a.data=this.state.background
    function checkIndex1(gId){
      return gId.id===a.id
    }
    let index = this.state.selectedColor.findIndex(checkIndex1)
    if(index<0 || this.props.traitCategory === 'SINGLE_CATEGORICAL'){
      add.push(a)
    }
    this.setState({
      selectedColor:add
    })
    this.props.updateMultipleColorSelection(this.props.traitId,add)
    //console.log("selected",this.state.selectedColor)
  }

  removeColorFromSelection(id){
    function checkIndex1(gId){
      return gId.id===id
    }
    let index = this.state.selectedColor.findIndex(checkIndex1)
    var a= this.state.selectedColor
    if(index>=0){
      a.splice(index,1)
    }
    this.setState({
      selectedColor:a
    })
    this.props.updateMultipleColorSelection(this.props.traitId,a)
    //console.log(index)
  }

  render() {
    return (
      <div className ="row" style={{marginTop:'0.7%'}}>
        <div className="col-sm-3">
          <div >
            <CompactPicker
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
            />
          </div>
        </div>
        <div className="col-sm-1">
          <a className="fa fa-angle-double-right"  style={{textDecoration:'none',marginTop:'5px',marginBottom:'5px',marginLeft:'25%'}} onClick={this.pushColorToSelection.bind(this)}></a>
        </div>
        <div className="col-sm-3" >
          <div className="well well-sm pre-scrollable" style={{marginLeft:'0%',paddingRight:'0px',paddingLeft:'0px',width:'245px',height:'91px',backgroundColor:'#FBFCFC',boxShadow: '1px 1px grey'}}>
          {
            this.state.selectedColor.map((item,index)=>{
              return(
                <div className="color_chip" key={index} style={{backgroundColor:item.id}} onClick={this.removeColorFromSelection.bind(this,item.id)}>
                  <i className="glyphicon glyphicon-remove " style={{color:'black',top:'-10px',right:'-15px'}}></i>
                </div>
              )
            })
          }
          </div>
        </div>
        <div className="col-sm-5">
        </div>

      </div>
    );
  }
}
export default ColorTrait;
