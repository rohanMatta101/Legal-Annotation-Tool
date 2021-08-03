import React, { Component } from 'react';
import Render from './Components/Render';
import './App.css';
import Summarization from './Components/Summarization';
import Similarity from './Components/Similarity';
import LabelingSubPart from './Components/LabelingSubPart';
import {FaHome} from 'react-icons/fa';
import Authenticate from './Components/Authenticate';
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      fileName : '',
      fileContent : '',
      fileName2 : '',
      fileContent2 : '',
      displayInput : true,
      Name : '',
      displayOption : false,
      displayRRL : false,
      displayES : false,
      displayDS : false,
      displayLSP : false,
      toolType : '',
      pageBegin : false,
      default : false,
      custom : false,
      labelInput : "",
        chosen : false,
        work:false,
      labelList : ["None"],
      annotator:false,
      admin:false  
    }
  }
  handleFilechangeone = e =>{
    //console.log("hello")
    //console.log(e.target.files[0])
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = ()=>{
      this.setState({
        fileName : file.name,
        fileContent : reader.result
      })
    }
    reader.onerror = () =>{
      console.log("error occured",reader.error);
    }
    //console.log(this.state.fileName);
    //console.log(this.state.fileContent);

  }
  handleFilechangetwo = e =>{
    //console.log("hello")
    //console.log(e.target.files[0])
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = ()=>{
      this.setState({
        fileName2 : file.name,
        fileContent2 : reader.result
      })
    }
    reader.onerror = () =>{
      console.log("error occured",reader.error);
    }
    //console.log(this.state.fileName);
    //console.log(this.state.fileContent);

  }
  nameInput = (e) =>{
    var name = e.target.value;
    this.setState({
      Name : name
    })
  }
  resetRender = () =>{
    console.log('resetRender');
    this.setState({
      fileName : '',
      fileContent : '',
      fileName2 : '',
      fileContent2 : '',
      pageBegin:false,
      displayOption:true,
      
      
    },()=>{
      
    })
  }
  resetDS = ()=>{
    this.setState({
      fileName : '',
      fileContent : '',
      fileName2 : '',
      fileContent2 : '',
      pageBegin:false,
      displayOption:true,
      displayDS:true,
      displayRRL : false,
      displayES : false,
      displayLSP : false,
      toolType : 'Document Similarity',
      
      
    },()=>{
      
    })
  }
  nameDone = () => {
    if(this.state.toolType === 'Rhetorical Role Labelling')
    {
      this.setState({
        displayInput : false,
        displayOption: true,
        displayRRL : true,
      },()=>{
        //console.log(this.state.displayInput)
        //console.log(this.state.Name);
      })
    }
    else if(this.state.toolType === 'Extractive Summarization')
    {
      this.setState({
        displayInput : false,
        displayOption: true,
        displayES : true,
      },()=>{
        //console.log(this.state.displayInput)
        //console.log(this.state.Name);
      })
    }
    else if(this.state.toolType === 'Document Similarity')
    {
      this.setState({
        displayInput : false,
        displayOption: true,
        displayDS : true,
      },()=>{
        //console.log(this.state.displayInput)
        //console.log(this.state.Name);
      })
    }
    else if(this.state.toolType === 'Labeling Sub Part'){
      this.setState({
        displayInput : false,
        displayOption: true,
        displayLSP : true,
      },()=>{
        //console.log(this.state.displayInput)
        //console.log(this.state.Name);
      })
    }
    
  }
  toolType = (e)=>{
    
    if(e.target.value === 'Rhetorical Role Labelling')
    {
      this.setState({
        toolType : "Rhetorical Role Labelling"
      })
    }
    else if(e.target.value === 'Extractive Summarization')
    {
      this.setState({
        toolType : "Extractive Summarization"
      })
    }
    else if(e.target.value === 'Labeling Sub Part'){
      this.setState({
        toolType : "Labeling Sub Part"
      })
    }
    else{
      this.setState({
        toolType : "Document Similarity"
      })
    }


  }
  display = ()=>{
    this.setState({pageBegin : true,displayOption:false})
  }
  defaultLabel = ()=>{
    this.setState({
        default:true,
        custom:false,
        chosen : true
    })
}
chooseCustom = ()=>{
    this.setState({
        default:false,
        custom:true,
        chosen : true
    })
}    
  customLabel = (e)=>{
    this.setState({
        labelInput : e.target.value,

    })
    
 }
 submitLabel = ()=>{
  var myarr = this.state.labelList;
  myarr.push(this.state.labelInput);
     this.setState({
         labelList : myarr,
         labelInput : ""
     },()=>{
         console.log(this.state.labelList)
     })

 }   
 workLabels = ()=>{
    this.setState({
        work : true
    })
 }
 adminTrue=()=>{
  this.setState({
    admin:true,
    annotator:false,
    fileName : '',
      fileContent : '',
      fileName2 : '',
      fileContent2 : '',
      displayInput : true,
      Name : '',
      displayOption : false,
      displayRRL : false,
      displayES : false,
      displayDS : false,
      displayLSP : false,
      toolType : '',
      pageBegin : false,
      default : false,
      custom : false,
      labelInput : "",
        chosen : false,
        work:false,
      labelList : ["None"],
  })
 }
 annotatorTrue=()=>{
  this.setState({
    admin:false,
    annotator:true,
    fileName : '',
      fileContent : '',
      fileName2 : '',
      fileContent2 : '',
      displayInput : true,
      Name : '',
      displayOption : false,
      displayRRL : false,
      displayES : false,
      displayDS : false,
      displayLSP : false,
      toolType : '',
      pageBegin : false,
      default : false,
      custom : false,
      labelInput : "",
        chosen : false,
        work:false,
      labelList : ["None"],
  })
 }
  render() {
    var display = <div className="App-header">
         
    <div className="Input">
    <label style={{color:'white'}}>Select File to be Annotated</label>
  <input type="file" style={{color:'white',marginLeft:'20px'}}  name="name"  onChange={this.handleFilechangeone}></input>
    </div>
    </div>
    if(this.state.displayOption)
    {
      if(!this.state.displayDS){
      display = <div>
        <div className="Home-Icon">
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
      <div className="App-header-display-option">
        
        <h1 style={{color:'white'}}>Legal Annotation Tool</h1>
          <div className="Input">
           <label style={{color:'white',marginRight:'30px'}}>Select File to be Annotated</label>
         <input type="file" style={{color:'white',paddingRight:'20px',borderRadius:'10px',backgroundColor:'black'}}  name="name"  onChange={this.handleFilechangeone}></input>
          </div>
          <button onClick={this.display} className="Button">Start</button>:null
      </div>
      </div>
      }
      else if(this.state.displayDS)
      {
        display = <div>
          <div className="Home-Icon">
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
          <div className="App-header-display-option">
        
        <h1 style={{color:'white'}}>Legal Annotation Tool</h1>
          <div className="Input-DS">
           <label style={{color:'white',marginRight:'30px'}}>Select File 1 to be Annotated</label>
         <input type="file" style={{color:'white',borderRadius:'10px',backgroundColor:'black'}}  name="name"  onChange={this.handleFilechangeone}></input>
         <label style={{color:'white',marginRight:'30px'}}>Select File 2 to be Annotated</label>
         <input type="file" style={{color:'white',borderRadius:'10px',backgroundColor:'black'}}  name="name"  onChange={this.handleFilechangetwo}></input>
          </div>
          <button onClick={this.display} className="Button">Start</button>:null
        </div>
        </div>
      }
    }
    else{
      display = null
    }
    return (
      <div>
        {this.state.admin===false && this.state.annotator===false?
        <div className="App-header-Input">
          <h1 style={{color:'white',marginBottom:'50px'}}>Legal Annotation Tool</h1>
          <button className="Button" onClick={this.adminTrue}>Admin</button>
          <button className="Button" onClick={this.annotatorTrue}>Annotator</button>
          
        </div>:null}
        {this.state.admin===true && this.state.annotator===false?
           <Authenticate/>:null}
       {this.state.annotator===true?<div className="App">
         {this.state.displayInput===true?
          <div className="App-header-Input">
            <h1 style={{color:'white',marginBottom:'50px'}}>Legal Annotation Tool</h1>
           <input type="text" style={{color:'white',backgroundColor:'black',marginRight:'10px',width:'340px',marginBottom:'20px',padding:'15px',borderWidth:'2px',borderColor:'white',borderRadius:'5px'}} name="Annotname" value={this.state.Name} onChange={this.nameInput} placeholder="Enter Your Name in LowerCase Letters Only" />
           <div className="Options">
           <label style={{color:'white',marginRight:'20px'}}>Select Tool You want To use</label>
            <select onChange={this.toolType} defaultValue="" style={{borderWidth:'2px',color:'white',backgroundColor:'black',borderRadius:'10px'}} >
              <option value="None">None</option>
              <option value="Rhetorical Role Labelling">Rhetorical Role Labelling</option>
              <option value="Extractive Summarization">Sentence Selection</option>
              <option value="Document Similarity">Document Similarity</option>
              <option value="Labeling Sub Part">Labeling Sub Part</option>
            </select>
            </div>
           {!this.state.work?
           <div>
             {!this.state.chosen && this.state.toolType!=='Extractive Summarization'?
             <div>
             <button onClick={this.defaultLabel} className="Button">Choose Default Labels</button>
             <button onClick={this.chooseCustom} className="Button">Create Custom Labels</button>
           </div>:null}
           {this.state.custom===true && this.state.default===false?<div>
                        <input type="text" placeholder="Enter new label" style={{marginRight:'5px',color:'white',backgroundColor:'black',borderRadius:'4px'}} onChange={this.customLabel} value={this.state.labelInput}/>
                        <button onClick={this.submitLabel} className="plusButton">+</button>
                        <button className="Button" onClick={this.workLabels}>Work with these Labels</button>
                    </div>:null}
           </div>:null}
           
            <button onClick={this.nameDone} className="Button">Begin</button>    
           </div>
           
          :display}
          {this.state.pageBegin?<div>
           {this.state.displayRRL?
           <div className="App-header">
           
           <Render fileName = {this.state.fileName} default={this.state.default?true:false} custom={this.state.custom?true:false} customList={this.state.custom?this.state.labelList:null} reset={this.resetRender.bind(this)} fileContt ={this.state.fileContent} name={this.state.Name}/>
           </div>:null}

           {this.state.displayES?<Summarization fileName = {this.state.fileName} reset={this.resetRender.bind(this)}  name={this.state.Name}  fileContt ={this.state.fileContent}/>:null}

            {this.state.displayDS?<Similarity default={this.state.default?true:false} custom={this.state.custom?true:false} customList={this.state.custom?this.state.labelList:null} fileName1={this.state.fileName} reset={this.resetDS.bind(this)}  name={this.state.Name} fileContent1={this.state.fileContent} fileName2={this.state.fileName2} fileContent2={this.state.fileContent2}/>:null}
            {this.state.displayLSP?<LabelingSubPart default={this.state.default?true:false} custom={this.state.custom?true:false} customList={this.state.custom?this.state.labelList:null} fileName = {this.state.fileName} reset={this.resetRender.bind(this)}   fileContt ={this.state.fileContent} name={this.state.Name}/>:null}
            </div>:null}
       </div>:null}
       </div>
    );
  }
}

export default App;
//Render component if for Rhetorical Role Labelling
/**/
