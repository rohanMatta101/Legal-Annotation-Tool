import React,{Component} from 'react';
import './Summarization.css';
import {FaHome} from 'react-icons/fa';
class Summarization extends Component{
    state={
        fileContent:this.props.fileContt,
        fileName:this.props.fileName,
        arraycontent : this.props.fileContt.split("\n"),
        wordCount : 0,
        sentenceCount : 0,
        arrayDisplay : [],
        sentenceData : [],
        displayInput:true,
        sentenceTickCount : 0,
        save : false,
        wordData : [],
        disableWord : false,
        disableSent : false,
        tWord : 0,
        currentWord : 0,
        error : false,
        continue:false,
        new:false,
        index : -1,
        disableCountbtn : false,
        continueList:[],
        continueCount:0,
        noContposs:false

    }
    /*functwo = ()=>{
        disableTick : false,
        var myarray = this.state.fileContent.split("\n");
        this.setState({
            arraycontent : myarray,
            disable : true
        })
    }*/
    setWord = (e) =>{
        if(e.target){
        this.setState({
            wordCount : e.target.value,
            disableSent : true
        })
     }
    }
    setSentence = (e) =>{
        if(e.target){
        this.setState({
            sentenceCount : e.target.value,
            disableWord : true
        })
       }
    }
    result = () =>{
        //SUBMITTING THE WORD/SENTENCE COUNT AND INITILIASING THEIR STATE
        this.setState({
            displayInput:false,
            noContposs:false
        })
      if(this.state.wordCount > 0)
      {
          var totalWord =0;
          //var wcount = +this.state.wordCount;
          var dumbarray = []
          for(var x=0;x<this.state.arraycontent.length;x++)
         {
            var mystr = this.state.arraycontent[x];
            var Count = 0;
            for(var f=0;f<mystr.length;f++)
            {
                if(mystr[f]===" "){
                    Count = Count + 1;
                }
            }
            var dumbobj = {
                sentence : mystr,
                wc : Count + 1 ,
                checked : false,
                exceeded : false
            }
            totalWord = totalWord + Count + 1;
            dumbarray.push(dumbobj);
         }
         this.setState({
             wordData : dumbarray,
             tword : totalWord,
             disableCountbtn : true

         })
      }
      //INPUT OF SENTENCE COUNT
      else if(this.state.sentenceCount > 0){
         //var count = +this.state.sentenceCount;
         var myarray = []
         //console.log(count);
         for(var xx=0;xx<this.state.arraycontent.length;xx++)
         {
             myarray.push(this.state.arraycontent[xx]);
         }
         this.setState({
             arrayDisplay : myarray
         },()=>{
            var dumbarray = []
            for(var t=0;t<this.state.arrayDisplay.length;t++)
            {
                var dumbobj = {}
                dumbobj = {
                    sentence : this.state.arrayDisplay[t],
                    checked : false,
                    exceeded : false
                }
                dumbarray.push(dumbobj);
            }
            this.setState({
                sentenceData : dumbarray,
                disableCountbtn : true
            },()=>{
                console.log(this.state.sentenceData);
            })
         })
      }
    }
    checkedSentence = (e,element)=>{
        var myarray = this.state.sentenceData
        for(var t=0;t<myarray.length;t++)
        {
            if(myarray[t].sentence === element)
            {
                
                myarray[t].checked = !myarray[t].checked
                if(myarray[t].checked === true)
                {
                     this.setState({
                         sentenceTickCount : this.state.sentenceTickCount + 1,
                         sentenceData : myarray,
                         index : t

                     },()=>{
                         var newarr = this.state.sentenceData;
                         var ind = this.state.index;
                         if(this.state.sentenceTickCount > this.state.sentenceCount)
                         {
                            newarr[ind].exceeded = true;
                             this.setState({
                                 error : true,
                                 sentenceData : newarr,
                                 index : -1
                             })
                         }
                         
                     })
                }
                else if(myarray[t].checked === false)
                {
                    this.setState({
                        sentenceTickCount : this.state.sentenceTickCount - 1,
                        sentenceData : myarray,
                        index:t
                    },(t)=>{
                        var newarr = this.state.sentenceData;
                        var ind = this.state.index;
                        if(this.state.sentenceTickCount <= this.state.sentenceCount)
                        {
                            newarr[ind].exceeded = false;
                            this.setState({
                                error : false,
                                sentenceData : newarr,
                                index : -1
                            })
                        }
                        else{
                            
                            newarr[ind].exceeded = false;
                            this.setState({
                                sentenceData : newarr,
                                index : -1
                            })
                        }
                    })
                }
            
            
           }
    }
        
        
    }
    checkedWord = (e,element)=>{
        
        var myarray = this.state.wordData;
        for(var t=0;t<myarray.length;t++)
        {
            if(myarray[t].sentence === element)
            {
                myarray[t].checked = !myarray[t].checked;
                if(myarray[t].checked === true)
                {
                   this.setState({
                       currentWord : this.state.currentWord + myarray[t].wc,
                       wordData : myarray,
                       index :t 
                   },()=>{
                       var newarr = this.state.wordData;
                       var ind =this.state.index;
                       if(this.state.currentWord > this.state.wordCount)
                       {
                           newarr[ind].exceeded = true;
                           this.setState({
                               error : true,
                               wordData : newarr,
                               index : -1
                           })
                       }
                   })
                }
                else if(myarray[t].checked === false)
                {
                    this.setState({
                        currentWord : this.state.currentWord - myarray[t].wc,
                        wordData : myarray,
                        index :t 
                    },()=>{
                        var newarr = this.state.wordData;
                        var ind =this.state.index;
                        if(this.state.currentWord <= this.state.wordCount)
                        {
                            newarr[ind].exceeded = false;
                            this.setState({
                                error : false,
                                wordData : newarr,
                                index: -1
                            })
                        }
                        else{
                            newarr[ind].exceeded = false;
                            this.setState({
                                wordData : newarr,
                                index: -1
                            })
                        }
                    })
                }
                
                break;
            }
        }


    }
    postSentence = ()=>{
        if(this.state.sentenceCount>0){
            var tosend = []
            var name = this.props.name;
            var fileName  = this.props.fileName
           var myarray = this.state.sentenceData;
           var sentenceCount=this.state.sentenceTickCount;
           var totalsentence=this.state.sentenceCount
           for(var t=0;t<myarray.length;t++)
           {
               if(myarray[t].checked === true)
               {
                   tosend.push(myarray[t].sentence);
               }
           }
           this.setState({
               save : true
           })
           fetch('https://lat-es-ae272-default-rtdb.firebaseio.com/Extractive-Summarization.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tosend,
                name,
                fileName,
                sentenceCount,
                totalsentence
            })
           })

        }
        
    }
    postWord = ()=>{
      var data = this.state.wordData;
      data = data.filter((element)=>{
          if(element.checked === true)
          {
              return true;
          }
          else{
              return false;
          }
      })
      var tosend = [];
      var name = this.props.name;
            var fileName  = this.props.fileName
            var wordCount=this.state.currentWord;
            var totalword=this.state.wordCount;
      for(var temp=0;temp<data.length;temp++)
      {
          tosend.push(data[temp].sentence);
      }
      this.setState({
          save : true
      })
      fetch('https://lat-es-ae272-default-rtdb.firebaseio.com/Extractive-Summarization.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tosend,
                name,
                fileName,
                wordCount,
                totalword
            })
           })

    }
    rechoose = ()=>{
        this.setState({
            wordCount : 0,
        sentenceCount : 0,
        arrayDisplay : [],
        sentenceData : [],
        displayInput:true,
        sentenceTickCount : 0,
        save : false,
        wordData : [],
        disableWord : false,
        disableSent : false,
        tWord : 0,
        currentWord : 0,
        wordDisplay : [],
        index : -1,
        disableCountbtn : false

        })
    }
    newSelection=()=>{
         this.setState({
             new:true,
             continue:false
         })
    }
    continueSelection=()=>{
        this.setState({
            new:false,
            continue:true
        },()=>{
            let list=[];
            let deleteKey;
            fetch('https://lat-es-ae272-default-rtdb.firebaseio.com/Extractive-Summarization.json',{
                method:'GET'
            })
            .then((resp)=>{
                return resp.json()
            })
            .then((ans)=>{
                //console.log(ans);
                let key=[];
                key=Object.keys(ans);
                //console.log(ans);
                let w=false;
                let s=false;
                let g=0;
                let check="wordCount";
               for( g=0;g<key.length;g++)
               {
                
                   //console.log(ans[g].data);
                    if(ans[key[g]].fileName===this.state.fileName && ans[key[g]].name===this.props.name)
                    {
                        if(check in ans[key[g]])
                        {
                            w=true;
                            s=false;
                        }
                        else{
                            w=false;
                            s=true;
                        }
                        deleteKey=key[g];
                        list=ans[key[g]].tosend;
                        break;
                    }
               }
               //console.log(list)
               if(list.length>0)
               {
                   fetch(`https://lat-es-ae272-default-rtdb.firebaseio.com/Extractive-Summarization/${deleteKey}.json`,{
                       method:'DELETE'
                   })
                  if(w){
                  this.setState({
                      continueList:list,
                      currentWord:ans[key[g]].wordCount,
                      wordCount:ans[key[g]].totalword,
                  },()=>{
                      
                    this.setState({
                        displayInput:false
                    })
                  if(this.state.wordCount > 0)
                  {
                      var totalWord =0;
                      //var wcount = +this.state.wordCount;
                      var dumbarray = []
                      for(var x=0;x<this.state.arraycontent.length;x++)
                     {
                        var mystr = this.state.arraycontent[x];
                        var Count = 0;
                        for(var f=0;f<mystr.length;f++)
                        {
                            if(mystr[f]===" "){
                                Count = Count + 1;
                            }
                        }
                        let cc=false;
                                for(let y=0;y<this.state.continueList.length;y++)
                                {
                                    if(mystr===this.state.continueList[y])
                                    {
                                         cc=true;
                                         break;
                                    }
                                }
                        var dumbobj = {
                            sentence : mystr,
                            wc : Count + 1 ,
                            checked : cc,
                            exceeded : false
                        }
                        totalWord = totalWord + Count + 1;
                        dumbarray.push(dumbobj);
                     }
                     this.setState({
                         wordData : dumbarray,
                         tword : totalWord,
                         disableCountbtn : true,
                         disableSent:true
                     })
                  }
                  //INPUT OF SENTENCE COUNT
                  else if(this.state.sentenceCount > 0){
                     //var count = +this.state.sentenceCount;
                     var myarray = []
                     //console.log(count);
                     for(var xx=0;xx<this.state.arraycontent.length;xx++)
                     {
                         myarray.push(this.state.arraycontent[xx]);
                     }
                     this.setState({
                         arrayDisplay : myarray
                     },()=>{
                        var dumbarray = []
                        for(var t=0;t<this.state.arrayDisplay.length;t++)
                        {
                            var dumbobj = {}
                            dumbobj = {
                                sentence : this.state.arrayDisplay[t],
                                checked : false,
                                exceeded : false
                            }
                            dumbarray.push(dumbobj);
                        }
                        this.setState({
                            sentenceData : dumbarray,
                            disableCountbtn : true
                        },()=>{
                            console.log(this.state.sentenceData);
                        })
                     })
                  }
                  })
                  }
                   else{
                    this.setState({
                        continueList:list,
                        sentenceCount:ans[key[g]].totalsentence,
                        sentenceTickCount:ans[key[g]].sentenceCount,
                    },()=>{
                        //console.log(this.state.continueList)
                        this.setState({
                            displayInput:false
                        })
                      if(this.state.wordCount > 0)
                      {
                          var totalWord =0;
                          //var wcount = +this.state.wordCount;
                          var dumbarray = []
                          for(var x=0;x<this.state.arraycontent.length;x++)
                         {
                            var mystr = this.state.arraycontent[x];
                            var Count = 0;
                            for(var f=0;f<mystr.length;f++)
                            {
                                if(mystr[f]===" "){
                                    Count = Count + 1;
                                }
                            }
                            var dumbobj = {
                                sentence : mystr,
                                wc : Count + 1 ,
                                checked : false,
                                exceeded : false
                            }
                            totalWord = totalWord + Count + 1;
                            dumbarray.push(dumbobj);
                         }
                         this.setState({
                             wordData : dumbarray,
                             tword : totalWord,
                             disableCountbtn : true
                
                         })
                      }
                      //INPUT OF SENTENCE COUNT
                      else if(this.state.sentenceCount > 0){
                         //var count = +this.state.sentenceCount;
                         //console.log('HI I AM HERE')
                         var myarray = []
                         //console.log(count);
                         for(var xx=0;xx<this.state.arraycontent.length;xx++)
                         {
                             myarray.push(this.state.arraycontent[xx]);
                         }
                         this.setState({
                             arrayDisplay : myarray
                         },()=>{
                            var dumbarray = []
                            //console.log(typeof(this.state.arrayDisplay[0]));
                            for(var t=0;t<this.state.arrayDisplay.length;t++)
                            {
                                let cc=false;
                                for(let y=0;y<this.state.continueList.length;y++)
                                {
                                    if(this.state.arrayDisplay[t]===this.state.continueList[y])
                                    {
                                         cc=true;
                                         break;
                                    }
                                }
                                var dumbobj = {}
                                dumbobj = {
                                    sentence : this.state.arrayDisplay[t],
                                    checked : cc,
                                    exceeded : false
                                }
                                dumbarray.push(dumbobj);
                            }

                            this.setState({
                                sentenceData : dumbarray,
                                disableCountbtn : true,
                                disableWord:true
                            },()=>{
                                console.log(this.state.sentenceData);
                            })
                         })
                      }
                    })
                   }
               }
               else{
                   //list empty
                   this.setState({
                       new:true,
                       continue:false,
                       noContposs:true
                   })
               }
               
            })
            .catch((err)=>{
                console.log('error');
            })
        })
    }
    render(){
        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div className="Icon" >
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
           
            <div className="Summarization">
              <h1 style={{color:'white'}}>Sentence Selection</h1>
              <h3 style={{color:'white',marginBottom:'50px'}}>fileName : {this.props.fileName}</h3>
              {this.state.continue===false&&this.state.new===false?
              <div>
                  <button className="Button" onClick={this.continueSelection}>Continue </button>
                  <button className="Button" onClick={this.newSelection}>New Sentence Selection</button>
              </div>:null}
              {this.state.new===true && this.state.continue===false?<div>
              <div className="Count">
                  {this.state.wordCount===0 && this.state.sentenceCount===0?<h3>Current Count 0/0</h3>:<h3 >{this.state.wordCount>0? `Words Checked : ${this.state.currentWord}/${this.state.wordCount}`:`Sentence Checked : ${this.state.sentenceTickCount}/${this.state.sentenceCount}`}</h3>}
              </div>     
              <div className="Sum-Input">
                  <label style={{color:'white',paddingRight:'4px'}} >Enter Word Count</label>
                  <input disabled={this.state.disableWord}  style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type="text" value={this.state.wordCount} onChange={this.setWord}/>
                  <label style={{color:'white',paddingLeft:'18px'}}>OR</label>
                  <label style={{color:'white',marginLeft:'15px',paddingRight:'4px'}}>Enter Sentence Count</label>
                  <input disabled={this.state.disableSent} style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type="text" value={this.state.sentenceCount} onChange={this.setSentence}/>
                  <button onClick={this.result} disabled={this.state.disableCountbtn} className={this.state.disableCountbtn?"Disabled":"Button"}>{this.state.disableCountbtn?"Count Submitted":"Submit Count"}</button>
              </div>

              {this.state.noContposs?<h3 style={{color:'white'}}>No previous Data Found</h3>:null}
              {this.state.wordCount>0?<div>
                
                {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postWord} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  {this.state.wordData.map((element)=>{
                      if(element){
                        return(
                            <div className="Displaydatarow" key={element.sentence}>
                       <p  style={{color:'white',marginLeft:'0px'}}>{element.sentence}</p>
                       <input type="checkbox" disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedWord(e,element.sentence)}/>
                       {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Word Count Exceeded</h5></div>:null}
                       
                      </div>
                        )
                        }else{
                            return null;
                        }
                  })}
                  {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postWord} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                 
              </div>:null}  

              {this.state.sentenceCount>0?<div>
                {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postSentence} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  {this.state.sentenceData.map((element)=>{
                      if(element){
                        return(
                            <div className="Displaydatarow" key={element.sentence}>
                       <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                       <input type="checkbox" disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedSentence(e,element.sentence)}/>
                       {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Sentence Count Exceeded</h5></div>:null}
                      </div>
                        )
                        }else{
                            return null;
                        }
                  })}
                  {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postSentence} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  
              </div>:null}
              </div>:null}
              {this.state.continue===true&&this.state.new===false?<div>
                  <div className="Count">
                  {this.state.wordCount>0? <h3>Words Checked : {this.state.currentWord}/{this.state.wordCount}</h3>:<h3>Sentence Checked : {this.state.sentenceTickCount}/{this.state.sentenceCount}</h3>}
              </div>     
              <div className="Sum-Input">
                  <label style={{color:'white',paddingRight:'4px'}} >Enter Word Count</label>
                  <input disabled={this.state.disableWord}  style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type="text" value={this.state.wordCount} onChange={this.setWord}/>
                  <label style={{color:'white',paddingLeft:'18px'}}>OR</label>
                  <label style={{color:'white',marginLeft:'15px',paddingRight:'4px'}}>Enter Sentence Count</label>
                  <input disabled={this.state.disableSent} style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type="text" value={this.state.sentenceCount} onChange={this.setSentence}/>
                  <button onClick={this.result} disabled={this.state.disableCountbtn} className={this.state.disableCountbtn?"Disabled":"Button"}>{this.state.disableCountbtn?"Count Submitted":"Submit Count"}</button>
              </div>

              {this.state.noContposs?<h3 style={{color:'white'}}>No previous Data Found</h3>:null}
              {this.state.wordCount>0?<div>
                
                {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postWord} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  {this.state.wordData.map((element)=>{
                      if(element){

                        for(let f=0;f<this.state.continueList.length;f++)
                        {
                            if(this.state.continueList[f]===element.sentence)
                            {
                                return(
                                    <div className="Displaydatarow" key={element.sentence}>
                               <p  style={{color:'white',marginLeft:'0px'}}>{element.sentence}</p>
                               <input type="checkbox" defaultChecked disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedWord(e,element.sentence)}/>
                               {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Word Count Exceeded</h5></div>:null}
                               
                              </div>
                                )
                            }
                        }
                        return(
                            <div className="Displaydatarow" key={element.sentence}>
                       <p  style={{color:'white',marginLeft:'0px'}}>{element.sentence}</p>
                       <input type="checkbox" disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedWord(e,element.sentence)}/>
                       {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Word Count Exceeded</h5></div>:null}
                       
                      </div>
                        )
                          
                        }else{
                            return null;
                        }
                  })}
                  {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postWord} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                 
              </div>:null}  

              {this.state.sentenceCount>0?<div>
                {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postSentence} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  {this.state.sentenceData.map((element)=>{
                      
                      if(element){
                          for(let f=0;f<this.state.continueList.length;f++)
                          {
                              if(this.state.continueList[f]===element.sentence)
                              {
                                return(
                                    <div className="Displaydatarow" key={element.sentence}>
                               <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                               <input type="checkbox" defaultChecked  disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedSentence(e,element.sentence)}/>
                               {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Sentence Count Exceeded</h5></div>:null}
                              </div>
                                )
                              }
                          }
                        
                        return(
                            <div className="Displaydatarow" key={element.sentence}>
                       <p style={{color:'white',marginLeft:'5px',marginRight:'10px'}}>{element.sentence}</p>
                       <input type="checkbox" disabled={this.state.error===true && element.exceeded===false?true:false} style={{padding:'2px',marginTop:'17px',width:'100px',height:'20px',backgroundColor:'black',color:'white'}} onChange={(e)=>this.checkedSentence(e,element.sentence)}/>
                       {element.exceeded===true?<div className="Sentence-error"><h5 style={{marginTop:'2px'}}>Sentence Count Exceeded</h5></div>:null}
                      </div>
                        )
                        
                        }else{
                            return null;
                        }
                  })}
                  {this.state.error?<div className="Error-down"><h3 >Count Exceeded! Cannot Save the file</h3></div>:
                  <div>
                     {!this.state.displayInput?<button onClick={this.postSentence} disabled={this.state.save} className={this.state.save?"Disabled":"Button"}>{this.state.save?"Saved":"Save"}</button>:null}
                  {!this.state.displayInput?<button onClick={this.props.reset} className="Button">Choose new file</button>:null}
                  {!this.state.displayInput?<button onClick={this.rechoose} className="Button">Choose new Sentence/Word Count</button>:null}
                      </div>}
                  
              </div>:null}
                  </div>:null}
            </div>
            
            </div>
        )
    }

}
export default Summarization;
