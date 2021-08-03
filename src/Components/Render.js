import React, {Component} from 'react';
//import DisplayData from './DisplayData';
import './Render.css';
//import styles from './Render.module.css'

import {FaHome} from 'react-icons/fa';
class Render extends Component {
    state = {
        fileContent : this.props.fileContt,
        fileName : this.props.fileName,
        arrayContent : [],
        getData : false,
        ans : [],
        nameAnnotater : this.props.name,
        proceed : true,
        disable : false,
        disableFetch : false,
        default :this.props.default,
        custom : this.props.custom,
        defaultList : [],
        customList : this.props.customList,
        new :false,
        continue:false,
        continuedList:[],
        shownew:false,
        

    }  
    functwo = () =>{
        //console.log(this.state.fileContent);
        if(this.state.default===true && this.state.custom===false){
        fetch('https://labels-rrl-default-rtdb.firebaseio.com/Labels.json',{
           method:'GET'
       }).then((resp)=>{
           return resp.json()
       }).then((ans)=>{
           
           var key=Object.keys(ans);
           console.log(ans[key].data);
         this.setState({
             defaultList:ans[key].data
        },()=>{
            let myarray = this.state.fileContent.split("\n");
            //console.log(myarray);
           let dumbarr = []
           for(var j=0;j<myarray.length;j++)
           {
               if(myarray[j].length > 0){
               dumbarr.push({
                   sentence : myarray[j],
                   label : ""
               })
               }
           }
           this.setState({
               arrayContent : myarray,
               getData :true,
               ans : dumbarr,
               disableFetch : true,
            })
        })
       }).catch(()=>{
        let myarray = this.state.fileContent.split("\n");
        //console.log(myarray);
       let dumbarr = []
       for(var j=0;j<myarray.length;j++)
       {
           if(myarray[j].length > 0){
           dumbarr.push({
               sentence : myarray[j],
               label : ""
           })
           }
       }
       this.setState({
           arrayContent : myarray,
           getData :true,
           ans : dumbarr,
           disableFetch : true,
           defaultList:[]
        })
           console.log('error occured')
       })
       }
       else if(this.state.default===false && this.state.custom===true){

       }
        var myarray = this.state.fileContent.split("\n");
        //console.log(myarray);
       var dumbarr = []
       for(var j=0;j<myarray.length;j++)
       {
           if(myarray[j].length > 0){
           dumbarr.push({
               sentence : myarray[j],
               label : ""
           })
           }
       }
       this.setState({
           arrayContent : myarray,
           getData :true,
           ans : dumbarr,
           disableFetch : true
        },()=>{
            console.log(this.state.ans);
        })
       
       
    }
    destroy  = ()=>{
        fetch('https://lat-rrl-default-rtdb.firebaseio.com/annotations.json',{
            method:'DELETE'
        })
    }
    valuechange = (e,element) =>{
        if(this.state.continue===true&&this.state.new===false){
       console.log(e.target.value)
       console.log(element);
       let myvar = this.state.continuedList;
       for(let a=0;a<myvar.length;a++)
       {
          if(myvar[a].sentence === element)
          {
              myvar[a].label = e.target.value;
              break;
          }
       }
       this.setState({
           continuedList : myvar
       },()=>{
           console.log(this.state.continuedList);
       })
       }
       else if(this.state.continue===false&&this.state.new===true)
       {
        console.log(e.target.value)
        console.log(element);
        var myvar = this.state.ans;
        for(var a=0;a<myvar.length;a++)
        {
           if(myvar[a].sentence === element)
           {
               myvar[a].label = e.target.value;
               break;
           }
        }
        this.setState({
            ans : myvar
        },()=>{
            console.log(this.state.ans);
        })
       }
    }
    postdata = () => {
        if(this.state.new===true && this.state.continue===false){
        const data = this.state.ans;
        const name_of_Annotator = this.state.nameAnnotater;
        const fileName = this.state.fileName;
            fetch('https://lat-rrl-default-rtdb.firebaseio.com/annotations.json',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                   name_of_Annotator,
                   fileName,
                   data
                })
            })
            this.setState({
                disable : true
            })

        }
        else if(this.state.new===false && this.state.continue===true)
        {
            const data = this.state.continuedList;
            const name_of_Annotator = this.state.nameAnnotater;
            const fileName = this.state.fileName;
                fetch('https://lat-rrl-default-rtdb.firebaseio.com/annotations.json',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                       name_of_Annotator,
                       fileName,
                       data
                    })
                })
                this.setState({
                    disable : true
                })
        }

    }
    newAnno=()=>{
       this.setState({
           new:true,
           continue:false,
           
       })
    }
    continueAnno=()=>{
        let list=[]
        let deleteKey;
        fetch('https://lat-rrl-default-rtdb.firebaseio.com/annotations.json',{
            method:'GET'
        })
        .then((resp)=>{
           return resp.json()
        })
        .then((ans)=>{
            let key=[];
            key=Object.keys(ans);
            
            //console.log(key)
            //console.log(ans)
           //console.log(ans[key].data);
           //console.log(ans);
           for(let g=0;g<key.length;g++)
           {
            
               //console.log(ans[g].data);
                if(ans[key[g]].fileName===this.state.fileName && ans[key[g]].name_of_Annotator===this.state.nameAnnotater)
                {
                    deleteKey=key[g];
                    list=ans[key[g]].data;
                    break;
                }
           }
           if(list.length>0)
           {
            this.setState({
                new:false,
                continue:true,
                continuedList:list,
                
               },()=>{
                fetch(`https://lat-rrl-default-rtdb.firebaseio.com/annotations/${deleteKey}.json`,{
                    method:'DELETE'
                })
               })
           }
           else{
               this.setState({
                   new:true,
                   continue:false,
                   shownew:true,
                   
               })
           }
           

        }).catch(()=>{
            console.log('error')
            this.setState({
                new:true,
                continue:false,
                shownew:true
            })
        })
        /*
        ,()=>{
            fetch(`https://lat-new-f1f1b-default-rtdb.firebaseio.com/annotations/${deleteKey}.json`,{
                method:'DELETE'
            })
           }*/ 
        
        
      
    }
    
    //console.log(arrayContent);
    render() {
        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                 <div className="Icon" >
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
            <div className="Render">
               
             <h1 style={{color:'white',marginBottom:'50px'}}>Rhetorical Role Labelling</h1>
             <h3 style={{color:'white',marginBottom:'50px'}}>fileName : {this.state.fileName}</h3>
             {this.state.new===false && this.state.continue===false?
             <div>
                 <button className="Button" onClick={this.continueAnno}>Continue Annotations</button>
             <button className="Button" onClick={this.newAnno}>New Annotations</button>
             </div>:null}
             {this.state.shownew?<h3 style={{color:'white'}}>No previous Annotations exist</h3>:null}
             {this.state.new===true && this.state.continue===false?<div>
                {this.state.default===true && this.state.custom===false?<div>
                <button className={this.state.disableFetch?"Disabled" : "Button"} disabled={this.state.disableFetch} onClick={this.functwo}>{this.state.disableFetch?'Data Fetched':'Click here to Fetch Data'}</button>
                <div className={this.state.getData ? "Box" : "Box-no"}>
                
                    {this.state.arrayContent ? this.state.arrayContent.map(element=>{
                        if(element){
                        return(
                            <div className="DisplayRender" key={element}>
                       <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element}</p>
                      <select  onChange={(e)=>this.valuechange(e,element)} className="Dropdown" >
                          {this.state.defaultList.map(el=>{
                              return <option style={{color:'white',backgroundColor:'black'}} key={el}  value={el}>{el}</option>
                          })}
                      
                      </select>
                      
                      </div>
                        )
                        }else{
                            return null;
                        }
                    }):null}
                    <button className={this.state.disable?"Disabled" : "Button"} disabled={this.state.disable} onClick={this.postdata}>{this.state.disable? 'Annotations Saved' : 'Save Annotations'}</button>
                    {this.state.disable?<button className="Button" onClick={this.props.reset}>Choose new file</button>:null}
                </div></div>:
                
                <div>
                    
                <div><button className={this.state.disableFetch?"Disabled" : "Button"} disabled={this.state.disableFetch} onClick={this.functwo}>{this.state.disableFetch?'Data Fetched':'Click here to Fetch Data'}</button>
                <div className={this.state.getData ? "Box" : "Box-no"}>
                
                    {this.state.arrayContent ? this.state.arrayContent.map(element=>{
                        if(element){
                        return(
                            <div className="DisplayRender" key={element}>
                       <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element}</p>
                      <select  onChange={(e)=>this.valuechange(e,element)} className="Dropdown" >
                          {this.state.customList.map(el=>{
                              return <option style={{color:'white',backgroundColor:'black'}} key={el}  value={el}>{el}</option>
                          })}
                      
                      </select>
                      
                      </div>
                        )
                        }else{
                            return null;
                        }
                    }):null}
                    <button className={this.state.disable?"Disabled" : "Button"} disabled={this.state.disable} onClick={this.postdata}>{this.state.disable? 'Annotations Saved' : 'Save Annotations'}</button>
                    {this.state.disable?<button className="Button" onClick={this.props.reset}>Choose new file</button>:null}
                </div></div>
                    </div>}
            </div>
            :<div>
            {this.state.default===true && this.state.custom===false?<div>
            <button className={this.state.disableFetch?"Disabled" : "Button"} disabled={this.state.disableFetch} onClick={this.functwo}>{this.state.disableFetch?'Data Fetched':'Click here to Fetch Data'}</button>
            <div className={this.state.getData ? "Box" : "Box-no"}>
            
                {this.state.continuedList ? this.state.continuedList.map(element=>{
                    if(element){
                    return(
                        <div className="DisplayRender" key={element}>
                   <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                  <select  onChange={(e)=>this.valuechange(e,element.sentence)} className="Dropdown" >
                      {this.state.defaultList.map(el=>{
                          if(element.label.length>0){
                              let show=false;
                              if(el===element.label){
                                  show=true
                              }
                          return <option style={{color:'white',backgroundColor:'black'}} key={el} selected={show} defaultValue=""  value={el}>{el}</option>
                          }
                          else{
                            return <option style={{color:'white',backgroundColor:'black'}} key={el} defaultValue=""  value={el}>{el}</option>
                          }
                      })}
                  
                  </select>
                  
                  </div>
                    )
                    }else{
                        return null;
                    }
                }):null}
                <button className={this.state.disable?"Disabled" : "Button"} disabled={this.state.disable} onClick={this.postdata}>{this.state.disable? 'Annotations Saved' : 'Save Annotations'}</button>
                {this.state.disable?<button className="Button" onClick={this.props.reset}>Choose new file</button>:null}
            </div></div>:
            
            <div>
                
            <div><button className={this.state.disableFetch?"Disabled" : "Button"} disabled={this.state.disableFetch} onClick={this.functwo}>{this.state.disableFetch?'Data Fetched':'Click here to Fetch Data'}</button>
            <div className={this.state.getData ? "Box" : "Box-no"}>
            
                {this.state.continuedList ? this.state.continuedList.map(element=>{
                    if(element){
                    return(
                        <div className="DisplayRender" key={element}>
                   <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                  <select  onChange={(e)=>this.valuechange(e,element.sentence)} className="Dropdown" >
                      {this.state.customList.map(el=>{
                            if(element.label){
                            let show=false;
                            if(el===element.label){
                                show=true
                            }
                            return <option style={{color:'white',backgroundColor:'black'}} key={el} selected={show} defaultValue="" value={el} >{el}</option>
                            }
                            else{
                              return <option style={{color:'white',backgroundColor:'black'}} key={el} defaultValue="" value={el}>{el}</option>
                            }
                          
                      })}
                  
                  </select>
                  
                  </div>
                    )
                    }else{
                        return null;
                    }
                }):null}
                <button className={this.state.disable?"Disabled" : "Button"} disabled={this.state.disable} onClick={this.postdata}>{this.state.disable? 'Annotations Saved' : 'Save Annotations'}</button>
                {this.state.disable?<button className="Button" onClick={this.props.reset}>Choose new file</button>:null}
            </div></div>
                </div>}
            </div>}
            </div>
            </div>
            
            
        )
    }
    
    
    
}
export default Render;
/*{!this.state.proceed?<div>
                    <h1 style={{color:'white'}}>All Sentences Not Annotated</h1>
                    </div>:null}
<button className="Button" onClick={this.destroy}>END Annotation</button>
                    
<option style={{color:'white',backgroundColor:'black'}}  value="None">None</option>   
                      <option style={{color:'white',backgroundColor:'black'}}  value="Facts">Facts</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Issue">Issue</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Argument">Argument</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Ruling by lower court">Ruling by lower court</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Statute">Statute</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Precedent">Precedent</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Ratio of the decision">Ratio of the decision</option>
                      <option style={{color:'white',backgroundColor:'black'}} value="Ruling by present court">Ruling by present court</option>*/ 