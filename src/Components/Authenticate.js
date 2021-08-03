import React,{Component} from 'react';
import {FaHome} from 'react-icons/fa';
import './Authenticate.css';
class Authenticate extends Component{
    state={
        getList:[],
        DSList:[],
        LSPList:[],
        password : "LAT123",
        input:'',
        continue:false,
        error:false,
        new:false,
        Nolabel:false,
        labelInput : "",
        displaydelete:false,
        displaySet:false,
        displaydeleteDS:false,
        displaySetDS:false,
        displaydeleteLSP:false,
        displaySetLSP:false,
      labelList : ["None"],
      newDS:false,
        NolabelDS:false,
      labelInputDS:"",
      labelListDS : ["None"],
      newLSP:false,
        NolabelLSP:false,
      labelInputLSP:"",
      labelListLSP : ["None"],
      

    }
    getLabels=()=>{
       fetch('https://labels-rrl-default-rtdb.firebaseio.com/Labels.json',{
           method:'GET'
       }).then((resp)=>{
           return resp.json()
       }).then((ans)=>{
           if(ans){
           var key=Object.keys(ans);
           console.log(ans[key].data);
         this.setState({
             getList:ans[key].data,
             Nolabel:false
         })
        }else{
         this.setState({
             Nolabel:true
         })
        }
       }).catch(()=>{
           console.log('error occured')
       })
    }
    getDSLabels=()=>{
        fetch('https://labels-ds-default-rtdb.firebaseio.com/Labels.json',{
            method:'GET'
        }).then((resp)=>{
            return resp.json()
        }).then((ans)=>{
            if(ans){
            var key=Object.keys(ans);
            console.log(ans[key].data);
          this.setState({
              DSList:ans[key].data,
              NolabelDS:false
          })
         }else{
          this.setState({
              NolabelDS:true
          })
         }
        }).catch(()=>{
            console.log('error occured')
        })
     }
     getLSPLabels=()=>{
        fetch('https://labels-lsp-default-rtdb.firebaseio.com/Labels.json',{
            method:'GET'
        }).then((resp)=>{
            return resp.json()
        }).then((ans)=>{
            if(ans){
            var key=Object.keys(ans);
            console.log(ans[key].data);
          this.setState({
              LSPList:ans[key].data,
              NolabelLSP:false
          })
         }else{
          this.setState({
              NolabelLSP:true
          })
         }
        }).catch(()=>{
            console.log('error occured')
        })
     }
    inputVal=(e)=>{
      this.setState({
          input:e.target.value
      })
    }
    checkPassword=()=>{
       if(this.state.input===this.state.password)
       {
          this.setState({
              continue:true,
              error:false
          })
       }else{
        this.setState({
            continue:false,
            error:true
        })
       }
    }
    postLabels=()=>{
        //let name="Rohan"
        let data=this.state.labelList;
        console.log(this.state.labelList)
        fetch('https://labels-rrl-default-rtdb.firebaseio.com/Labels.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                data
            })

        })
        this.setState({
            new:false,
            Nolabel:false
        },()=>{
            this.setState({
                displaySet:true
            })
            setTimeout(()=>{
                this.setState({
                    displaySet:false
                })
            },2000)
        })
    }
    postLabelsDS=()=>{
        //let name="Rohan"
        let data=this.state.labelListDS;
        console.log(this.state.labelListDS)
        fetch('https://labels-ds-default-rtdb.firebaseio.com/Labels.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                data
            })

        })
        this.setState({
            newDS:false,
            NolabelDS:false
        },()=>{
            this.setState({
                displaySetDS:true
            })
            setTimeout(()=>{
                this.setState({
                    displaySetDS:false
                })
            },2000)
        })
    }
    postLabelsLSP=()=>{
        //let name="Rohan"
        let data=this.state.labelListLSP;
        console.log(this.state.labelListLSP)
        fetch('https://labels-lsp-default-rtdb.firebaseio.com/Labels.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                data
            })

        })
        this.setState({
            newLSP:false,
            NolabelLSP:false
        },()=>{
            this.setState({
                displaySetLSP:true
            })
            setTimeout(()=>{
                this.setState({
                    displaySetLSP:false
                })
            },2000)
        })
    }
    deleteLabel=()=>{
        fetch('https://labels-rrl-default-rtdb.firebaseio.com/Labels.json',{
           method:'DELETE'
       })
       this.setState({
           getList:[],
           Nolabel:false
       },()=>{
           this.setState({
               displaydelete:true
           })
           setTimeout(()=>{
            this.setState({
                displaydelete:false
            })
           },2000)
       })
    }
    deleteDSLabels=()=>{
        fetch('https://labels-ds-default-rtdb.firebaseio.com/Labels.json',{
           method:'DELETE'
       })
       this.setState({
           DSList:[],
           NolabelDS:false
       },()=>{
        this.setState({
            displaydeleteDS:true
        })
        setTimeout(()=>{
         this.setState({
             displaydeleteDS:false
         })
        },2000)
       })
    }
    deleteLSPLabels=()=>{
        fetch('https://labels-lsp-default-rtdb.firebaseio.com/Labels.json',{
           method:'DELETE'
       })
       this.setState({
           LSPList:[],
           NolabelLSP:false
       },()=>{
        this.setState({
            displaydeleteLSP:true
        })
        setTimeout(()=>{
         this.setState({
             displaydeleteLSP:false
         })
        },2000)
       })
    }
    setNew=()=>{
       this.setState({
           new:true,
           Nolabel:false,
           labelList:["None"]
       })
    }
    setNewDS=()=>{
        this.setState({
            newDS:true,
            NolabelDS:false,
            labelListDS:["None"]
        })
     }
     setNewLSP=()=>{
        this.setState({
            newLSP:true,
            NolabelLSP:false,
            labelListLSP:["None"]
        })
     }
    customLabel = (e)=>{
        this.setState({
            labelInput : e.target.value,
        })
        
     }
     customLabelDS = (e)=>{
        this.setState({
            labelInputDS : e.target.value,
        })
        
     }
     customLabelLSP = (e)=>{
        this.setState({
            labelInputLSP : e.target.value,
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
     submitLabelDS = ()=>{
        var myarr = this.state.labelListDS;
        myarr.push(this.state.labelInputDS);
           this.setState({
               labelListDS : myarr,
               labelInputDS : ""
           },()=>{
               console.log(this.state.labelListDS)
           })
      
       }   
       submitLabelLSP = ()=>{
        var myarr = this.state.labelListLSP;
        myarr.push(this.state.labelInputLSP);
           this.setState({
               labelListLSP : myarr,
               labelInputLSP : ""
           },()=>{
               console.log(this.state.labelListLSP)
           })
      
       }   
     
    render(){
        return(
            <div className="Authenticate">
                <div className="Icon" >
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
                <h1 style={{color:'white',marginBottom:'50px'}}>Legal Annotation Tool</h1>
                {!this.state.continue?<div>
                <input type="password" onChange={this.inputVal}/>
                <button onClick={this.checkPassword}>Enter</button>
                </div>:
                <div className="AuthCont">
                    <div className="Cont">
                    <h2 style={{color:'white',marginBottom:'50px'}}>Rhetorical Role Labeling</h2>
                    <button className="Button" onClick={this.getLabels}>Get Current Labels</button>
                    <button className="Button" onClick={this.deleteLabel}>Delete Current labels</button>
                    <button className="Button" onClick={this.setNew}>Set New Labels</button>
                    {this.state.new?
                    <div>
                        <input type="text" placeholder="Enter new label" style={{marginRight:'5px',color:'white',backgroundColor:'black',borderRadius:'4px'}} onChange={this.customLabel} value={this.state.labelInput}/>
                        <button onClick={this.submitLabel} className="plusButton">+</button>
                        <button className="Button" onClick={this.postLabels}>Submit these Labels</button>
                    </div>:null}
                    {this.state.Nolabel?<div><h3 style={{color:'white'}}>No labels Exist</h3></div>:null}
                    {this.state.getList.length>0?<div><h3 style={{color:'white'}}>List of Current Labels</h3></div>:null}
                    
                    {this.state.getList.length>0?
                    <div className="Mylist">
                        <ul>
                       {this.state.getList.map((element)=>{
                           return <li style={{color:'white'}} key={element}>{element}</li>
                       })}
                       </ul>
                    </div>
                    :null}
                    {this.state.displaySet?<h3 style={{color:'white',marginBottom:'50px'}}>Labels Submitted</h3>:null}
                    {this.state.displaydelete?<h3 style={{color:'white',marginBottom:'50px'}}>Current Labels Deleted</h3>:null}
                    
                    </div>
                    
                    <div className="Cont">
                    <h2 style={{color:'white',marginBottom:'50px'}}>Document Similarity</h2>
                    <button className="Button" onClick={this.getDSLabels}>Get Current Labels</button>
                    <button className="Button" onClick={this.deleteDSLabels}>Delete Current labels</button>
                    <button className="Button" onClick={this.setNewDS}>Set New Labels</button>
                    {this.state.newDS?
                    <div>
                        <input type="text" placeholder="Enter new label" style={{marginRight:'5px',color:'white',backgroundColor:'black',borderRadius:'4px'}} onChange={this.customLabelDS} value={this.state.labelInputDS}/>
                        <button onClick={this.submitLabelDS} className="plusButton">+</button>
                        <button className="Button" onClick={this.postLabelsDS}>Submit these Labels</button>
                    </div>:null}
                    {this.state.NolabelDS?<div><h3 style={{color:'white'}}>No labels Exist</h3></div>:null}
                    {this.state.DSList.length>0?<div><h3 style={{color:'white'}}>List of Current Labels</h3></div>:null}
                    
                    {this.state.DSList.length>0?
                    <div className="Mylist">
                        <ul>
                       {this.state.DSList.map((element)=>{
                           if(element!=="None"){
                            return <li style={{color:'white'}} key={element}>{element}</li>
                            }
                            else{
                                return null;
                            }
                       })}
                       </ul>
                    </div>
                    :null}
                    {this.state.displaySetDS?<h3 style={{color:'white',marginBottom:'50px'}}>Labels Submitted</h3>:null}
                    {this.state.displaydeleteDS?<h3 style={{color:'white',marginBottom:'50px'}}>Current Labels Deleted</h3>:null}
                    </div>
                    <div className="Cont">
                    <h2 style={{color:'white',marginBottom:'50px'}}>Labeling Sub Parts</h2>
                    <button className="Button" onClick={this.getLSPLabels}>Get Current Labels</button>
                    <button className="Button" onClick={this.deleteLSPLabels}>Delete Current labels</button>
                    <button className="Button" onClick={this.setNewLSP}>Set New Labels</button>
                    {this.state.newLSP?
                    <div>
                        <input type="text" placeholder="Enter new label" style={{marginRight:'5px',color:'white',backgroundColor:'black',borderRadius:'4px'}} onChange={this.customLabelLSP} value={this.state.labelInputLSP}/>
                        <button onClick={this.submitLabelLSP} className="plusButton">+</button>
                        <button className="Button" onClick={this.postLabelsLSP}>Submit these Labels</button>
                    </div>:null}
                    {this.state.NolabelLSP?<div><h3 style={{color:'white'}}>No labels Exist</h3></div>:null}
                    {this.state.LSPList.length>0?<div><h3 style={{color:'white'}}>List of Current Labels</h3></div>:null}
                    
                    {this.state.LSPList.length>0?
                    <div className="Mylist">
                        <ul>
                       {this.state.LSPList.map((element)=>{
                           if(element!=="None"){
                           return <li style={{color:'white'}} key={element}>{element}</li>
                           }
                           else{
                               return null;
                           }
                       })}
                       </ul>
                    </div>
                    :null}
                    {this.state.displaySetLSP?<h3 style={{color:'white',marginBottom:'50px'}}>Labels Submitted</h3>:null}
                    {this.state.displaydeleteLSP?<h3 style={{color:'white',marginBottom:'50px'}}>Current labels Deleted</h3>:null}
                    </div>

                </div>}
                {this.state.error?<div><h3 style={{color:'white',marginBottom:'50px'}}>Invalid Password Try again</h3></div>:null}   

                
            </div>
        )
    }
}
export default Authenticate;
