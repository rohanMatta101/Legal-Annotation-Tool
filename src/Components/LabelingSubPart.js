import React,{Component} from 'react';
import TextSelector from 'text-selection-react';
import './LabelingSubPart.css';
import {FaHome} from 'react-icons/fa';
class LabelingSubPart extends Component{
    state={
        fileContent : this.props.fileContt,
        fileName : this.props.fileName,
        arrayContent : [],
        getData : false,
        nameAnnotater : this.props.name,
        currentLab : '',
        currentElement : '',
        currentSelection : '',
        default : this.props.default,
        custom : this.props.custom,
        customList : this.props.customList,
        defaultList : [],
        disableBtn : false,
        MSG:false

    }
    funcLSP = ()=>{
        if(this.state.default===true && this.state.custom===false)
        {
            fetch('https://labels-lsp-default-rtdb.firebaseio.com/Labels.json',{
                method:'GET'
            }).then((resp)=>{
                return resp.json()
            }).then((ans)=>{
                
                var key=Object.keys(ans);
                console.log(ans[key].data);
              this.setState({
                  defaultList:ans[key].data
                  
              },()=>{
                var myarr = this.state.fileContent.split("\n");
                console.log(myarr);
                var newarr = []
                for(var t=0;t<myarr.length;t++)
                {
                    var myobj = {
                        sentence : myarr[t],
                        phraseSelected : [],
                    }
                    newarr.push(myobj);
                }
                //console.log(newarr)
                this.setState({
                    getData:true,
                    arrayContent:newarr
                },()=>{
                    console.log(this.state.arrayContent)
                })
              })
              
            }).catch(()=>{
                console.log('error occured')
            })
        }
        else if(this.state.default===false && this.state.custom===true){
        var myarr = this.state.fileContent.split("\n");
        console.log(myarr);
        var newarr = []
        for(var t=0;t<myarr.length;t++)
        {
            var myobj = {
                sentence : myarr[t],
                phraseSelected : [],
            }
            newarr.push(myobj);
        }
        //console.log(newarr)
        this.setState({
            getData:true,
            arrayContent:newarr
        },()=>{
            console.log(this.state.arrayContent)
        })
        }
    }
    handler=(html,text)=>{
      console.log(html)
      this.setState({
          currentSelection:text
      })
    }
    saveSelect = (element)=>{
        
        this.setState({
            currentElement : element,
        })
        
    }
    setLabel = (e)=>{
       this.setState({
           currentLab : e.target.value
       })
    }
    saveBoth = ()=>{
        var copy = this.state.arrayContent;
        var selected = this.state.currentSelection;
        var elementChose = this.state.currentElement;
        var label = this.state.currentLab;
        for(var k=0;k<copy.length;k++)
        {
            
            if(copy[k].sentence === elementChose.sentence)
            {
                var currentHigh = {
                   phrase : selected,
                   label  : label
                }
                copy[k].phraseSelected.push(currentHigh);
                break;
            }
        }
        this.setState({
            arrayContent : copy,
            currentElement :'',
            currentLab:'',
            currentSelection:'',
            MSG:true
        },()=>{
            setTimeout(()=>{
               this.setState({
                   MSG:false
               })
            },1200)
            console.log(this.state.arrayContent);
        })
    }
    postData = ()=>{
        this.setState({
            disableBtn:true
        },()=>{
            var name = this.state.nameAnnotater;
            var fileName = this.state.fileName;
            var inputData = this.state.arrayContent;
            var HighlightedData = []
      
            for(var k=0;k<inputData.length;k++)
            {
                if(inputData[k].phraseSelected.length>0)
                {
                    var sent = inputData[k].sentence;
                    for( var h=0;h<inputData[k].phraseSelected.length;h++)
                    {
                        var ind = sent.indexOf(inputData[k].phraseSelected[h].phrase);
                        var len = inputData[k].phraseSelected[h].phrase.length;
                        var st = ind;
                        var end  = ind + len;
                        //starting check
                        var dummystr = ""
                        for(var xx=st-1;xx>=0;xx=xx-1)
                        {
                             if(sent[xx]!==" ")
                             {
                                 dummystr = dummystr + sent[xx];
                             }
                             else if(sent[xx]===" ")
                             {
                                 break;
                             }
                        }
                        if(dummystr.length>0)
                        {
                            var rev = dummystr.split('').reverse().join('')
                          var ccsent = inputData[k].phraseSelected[h].phrase;
                          var final = rev + ccsent;
                          inputData[k].phraseSelected[h].phrase = final;
                        }
                        //endcheck
                        var dummyendstr = ""
                        for(var tt=end;tt<inputData[k].sentence.length;tt++)
                        {
                            if(sent[tt]!==" ")
                            {
                                dummyendstr = dummyendstr + sent[tt];
                            }
                            else if(sent[tt]===" "){
                                break;
                            }
                        }
                        if(dummyendstr.length>0)
                        {
                            var ttsent = inputData[k].phraseSelected[h].phrase;
                            var finalend = ttsent + dummyendstr;
                            inputData[k].phraseSelected[h].phrase = finalend
                        }
                        console.log(inputData[k].phraseSelected)
                        
                    }
                }
            }
            for(var f=0;f<inputData.length;f++)
            {
                if(inputData[f].phraseSelected.length>0)
                {
                    HighlightedData.push(inputData[f]);
                }
            }
            fetch('https://lat-lsp-default-rtdb.firebaseio.com/Labeling-Subparts.json',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  name,
                  fileName,
                  HighlightedData
              })
            })
        })
      //https://lat-4-c1e3b-default-rtdb.firebaseio.com/
      
    }
    
    render(){
        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div className="Icon" >
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
            <div className="LabelingSubPart">
                <TextSelector events={[
                 {
                      text: 'Highlight',
                      handler: this.handler
                  }
                 ]}
                color={'yellow'}
                 colorText={true}/>
                 <div className="LabelingSubPart-header">
                 <h1 style={{color:'white',marginBottom:'50px'}}>Labelling Sub Parts</h1>
                  <h3 style={{color:'white',marginBottom:'50px'}}>fileName : {this.state.fileName}</h3>

                  
                </div>
                {this.state.default===true && this.state.custom===false?
                <div>
                <button className={this.state.getData?"LSPbuttondisable":"LSPbuttonforFetch"} disabled={this.state.getData}  onClick={this.funcLSP}>Click here to Fetch File Data</button>
                
          
                   <div style={{display:'flex',flexDirection:'row'}}>
                   <div className={this.state.getData ? "LabelingSubPart-box" : "LabelingSubPart-boxno"}>
          
                  {this.state.arrayContent.length>0 ? this.state.arrayContent.map(element=>{
                   if(element){
                   return(
                      <div className="DisplayLSP" key={element.sentence}>
                      <p onMouseDown={()=>this.saveSelect(element)} style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                
                      </div>
                   )
                   }else{
                      return null;
                   }
                   }):null}

            </div>
            {this.state.getData?<p style={{color:'white',marginLeft:'790px',position:'fixed'}}>choose label for highlighted part</p>:null}
            {this.state.getData?<div className="DropLSP">
            <select className="LabelingSubPart-dropdown" onChange={this.setLabel} defaultValue="" value={this.state.currentLab}>
                      {this.state.defaultList.map(num=>{
                          console.log(num)
                          return(
                            
                            <option style={{color:'white',fontSize:'1.5rem'}}  value={num}>{num}</option>   
                            
                          )
                      })}
                      </select>
                      
                      <button className="LSPbutton" onClick={this.saveBoth}>Add Label to Highlighted Part</button>
                      {this.state.MSG?<div className="Saved"><h4 style={{color:'black'}}>Label Saved</h4></div>:null}
             </div>:null}
             
             </div>
             
             {this.state.getData?<div style={{padding:'10px'}}><button onClick={this.postData} disabled={this.state.disableBtn} className={this.state.disableBtn?"BtnDisable":"LSPbuttonforFetch"}>{this.state.disableBtn?"Saved":"Save"}</button></div>:null}
             {this.state.getData?<div style={{padding:'10px'}}><button onClick={this.props.reset} className="LSPbuttonforFetch">Choose new file</button></div>:null}          
            </div>:null}

            {this.state.default===false && this.state.custom===true?
            <div>
                
                <div>
                    <button className={this.state.getData?"LSPbuttondisable":"LSPbuttonforFetch"} disabled={this.state.getData}  onClick={this.funcLSP}>Click here to Fetch File Data</button>
                
          
                   <div style={{display:'flex',flexDirection:'row'}}>
                   <div className={this.state.getData ? "LabelingSubPart-box" : "LabelingSubPart-boxno"}>
          
                  {this.state.arrayContent.length>0 ? this.state.arrayContent.map(element=>{
                   if(element){
                   return(
                      <div className="DisplayLSP" key={element.sentence}>
                      <p onMouseDown={()=>this.saveSelect(element)} style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                
                      </div>
                   )
                   }else{
                      return null;
                   }
                   }):null}

            </div>
            {this.state.getData?<p style={{color:'white',marginLeft:'790px',position:'fixed'}}>choose label for highlighted part</p>:null}
            {this.state.getData?<div className="DropLSP">
            <select className="LabelingSubPart-dropdown" onChange={this.setLabel} defaultValue="" value={this.state.currentLab}>
                      {this.state.customList.map(num=>{
                          console.log(num)
                          return(
                            
                            <option style={{color:'white',fontSize:'1.5rem'}}  value={num}>{num}</option>   
                            
                          )
                      })}
                      </select>
                      
                      <button className="LSPbutton" onClick={this.saveBoth}>Add Label to Highlighted Part</button>
                      {this.state.MSG?<div className="Saved"><h4 style={{color:'black'}}>Label Saved</h4></div>:null}
             </div>:null}
             </div>
             
             {this.state.getData?<div style={{padding:'10px'}}><button onClick={this.postData} disabled={this.state.disableBtn} className={this.state.disableBtn?"BtnDisable":"LSPbuttonforFetch"}>{this.state.disableBtn?"Saved":"Save"}</button></div>:null}
             {this.state.getData?<div style={{padding:'10px'}}><button onClick={this.props.reset} className="LSPbuttonforFetch">Choose new file</button></div>:null}          
            </div>
            </div>:null}
            </div>
            </div>
            
            
        )
    }
}
export default LabelingSubPart;
//<button className="LSPbutton" onClick={this.saveBoth}>Add Label to Highlighted Part?</button>
