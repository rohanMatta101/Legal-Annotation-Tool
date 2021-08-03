import React,{Component} from 'react';
import './Similarity.css';
import TextSelector from 'text-selection-react'
import {FaHome} from 'react-icons/fa';
class Similarity extends Component{
    state={
        fileName1 : this.props.fileName1,
        fileContent1 : this.props.fileContent1,
        fileName2 : this.props.fileName2,
        fileContent2 : this.props.fileContent2,
        arrayContent1 : this.props.fileContent1.split("\n"),
        arrayContent2 : this.props.fileContent2.split("\n"),
        phraseH1:[],
        phraseH2:[],
        nameAnno : this.props.name, 
        display : false,
        labels : {
            facts : 0,
            issue : 0,
            argument : 0,
            ruling_by_lower_court : 0,
            statute : 0,
            precedent :0,
            ratio_of_the_decision : 0,
            ruling_by_present_court : 0

        },
        currentSelection : '',
        currentFile : '',
        currentElement:'',
        default : this.props.default,
        custom : this.props.custom,
        customList : this.props.customList,
        defaultlist:[],
        disableBtn : false,
        displayError : false,
        continue:false,
        new:false,
        showcn:false
        
    }
    begin = ()=>{
        if(this.state.default===false && this.state.custom===true){
        var myarr1  = [];
        for(var x=0;x<this.state.arrayContent1.length;x++)
        {
               var myobj = {
                   sentence : this.state.arrayContent1[x],
                   highlighted : []
               }
               myarr1.push(myobj);
        }
        var myarr2 = [];
        for(var y=0;y<this.state.arrayContent2.length;y++)
        {
             var newobj = {
                sentence : this.state.arrayContent2[y],
                highlighted : []
             }
             myarr2.push(newobj);
        }
        var finarr=[]
        var dummarr = this.state.customList;
        for(var i=0;i<dummarr.length;i++)
        {
            if(dummarr[i]!=="None"){
          let myobj = {
              label : dummarr[i],
              score : 0
          }
          finarr.push(myobj)
          }
        }
        this.setState({
            phraseH1:myarr1,
            phraseH2:myarr2,
            customList : finarr,
            display:true,
            showcn:true
        })
        }
        else{
            fetch('https://labels-ds-default-rtdb.firebaseio.com/Labels.json',{
           method:'GET'
       }).then((resp)=>{
           return resp.json()
       }).then((ans)=>{
           
           var key=Object.keys(ans);
           console.log(ans[key].data);
         this.setState({
             defaultlist:ans[key].data
          },()=>{
            let finarr=[]
            let dummarr = this.state.defaultlist;
            for(var i=0;i<dummarr.length;i++)
            {
                if(dummarr[i]!=="None"){
              let myobj = {
                  label : dummarr[i],
                  score : 0
              }
              finarr.push(myobj)
              }
            }
            let myarr1  = [];
            for(let x=0;x<this.state.arrayContent1.length;x++)
            {
                   let myobj = {
                       sentence : this.state.arrayContent1[x],
                       highlighted : []
                   }
                   myarr1.push(myobj);
            }
            let myarr2 = [];
            for(let y=0;y<this.state.arrayContent2.length;y++)
            {
                 let newobj = {
                    sentence : this.state.arrayContent2[y],
                    highlighted : []
                 }
                 myarr2.push(newobj);
            }
            this.setState({
                phraseH1:myarr1,
                phraseH2:myarr2,
                defaultlist:finarr,
                display:true,
                showcn:true
            })
          })
       }).catch(()=>{
           console.log('error occured')
       })
            
        }


    }
    
    handler=(html,text)=>{
        console.log(text)
        this.setState({
            currentSelection:text
        },()=>{
            if(this.state.currentFile === 'f1')
            {
                var oneobj = this.state.phraseH1;
          
      
                oneobj.forEach((element)=>{
                  if(element.sentence === this.state.currentElement)
                 {
                 var dumarr = element.highlighted;
                dumarr.push(this.state.currentSelection);
               element.highlighted = dumarr;
           
                }
             })

             this.setState({
          phraseH1 : oneobj,
          currentSelection :'',
          currentFile:'',
          currentElement:''
              },()=>{
          console.log(this.state.phraseH1);
              })
            }
            else if(this.state.currentFile === 'f2')
            {
                var twoobj = this.state.phraseH2;
                
                twoobj.forEach((element)=>{
                  if(element.sentence === this.state.currentElement)
                  {
                     var dumarr = element.highlighted;
                     dumarr.push(this.state.currentSelection);
                     element.highlighted = dumarr;
                     
                  }
                })
                this.setState({
                    phraseH2 : twoobj,
                    currentSelection :'',
                   currentFile:'',
                  currentElement:''
                },()=>{
                    console.log(this.state.phraseH2);
                })
                
            }
        })
    }
    
    postData = ()=>{
        //phraseH1
        if(this.state.continue===false && this.state.new===true){
            if(this.state.default===true && this.state.custom===false)
            {
                let inputData1 = this.state.phraseH1;
            let selected_d1 = [];
            let phrase_d1=[];
            for(let k=0;k<inputData1.length;k++)
            {
                if(inputData1[k].highlighted.length > 0)
                {
                    let sent = inputData1[k].sentence;
                    for( let h=0;h<inputData1[k].highlighted.length;h++)
                    {
                    let ind = sent.indexOf(inputData1[k].highlighted[h]);
                      let len = inputData1[k].highlighted[h].length;
                      let st = ind;
                      let end  = ind + len;
                      //starting check
                      let dummystr = ""
                      for(let xx=st-1;xx>=0;xx=xx-1)
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
                          let rev = dummystr.split('').reverse().join('')
                        let ccsent = inputData1[k].highlighted[h];
                        let final = rev + ccsent;
                        inputData1[k].highlighted[h] = final;
                      }
                      //endcheck
                      let dummyendstr = ""
                      for(let tt=end;tt<inputData1[k].sentence.length;tt++)
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
                          let ttsent = inputData1[k].highlighted[h];
                          let finalend = ttsent + dummyendstr;
                          inputData1[k].highlighted[h] = finalend
                      }
                      
                    }
                    
                    let myobj={
                        highlightedParts:inputData1[k].highlighted,
                        sentence : inputData1[k].sentence
                    }
                    selected_d1.push(myobj);
                    for(let f=0;f<inputData1[k].highlighted.length;f++)
                    {
                        
                        phrase_d1.push(inputData1[k].highlighted[f])
                    }
                }
                //console.log(inputData1[k].highlighted)
            }
            
            //phraseH2
            let inputData2 = this.state.phraseH2;
            let selected_d2 = [];
            let phrase_d2=[];
            for(let j=0;j<inputData2.length;j++)
            {
                if(inputData2[j].highlighted.length > 0)
                {
                    let sent = inputData2[j].sentence;
                    for( let h=0;h<inputData2[j].highlighted.length;h++)
                    {
                    let ind = sent.indexOf(inputData2[j].highlighted[h]);
                      let len = inputData2[j].highlighted[h].length;
                      let st = ind;
                      let end  = ind + len;
                      //starting check
                      let dummystr = ""
                      for(let xx=st-1;xx>=0;xx=xx-1)
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
                          let rev = dummystr.split('').reverse().join('')
                        let ccsent = inputData2[j].highlighted[h];
                        let final = rev + ccsent;
                        inputData2[j].highlighted[h] = final;
                      }
                      //endcheck
                      let dummyendstr = ""
                      for(let tt=end;tt<inputData2[j].sentence.length;tt++)
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
                          let ttsent = inputData2[j].highlighted[h];
                          let finalend = ttsent + dummyendstr;
                          inputData2[j].highlighted[h] = finalend
                      }
                    }
    
                    let myobj={
                        highlightedParts:inputData2[j].highlighted,
                        sentence : inputData2[j].sentence
                    }
                    selected_d2.push(myobj);
                    for(let g=0;g<inputData2[j].highlighted.length;g++)
                    {
                        phrase_d2.push(inputData2[j].highlighted[g])
                    }
                }
            }
            if((phrase_d1.length!==0 && phrase_d2.length===0) || (phrase_d1.length===0 && phrase_d2.length!==0))
            {
                this.setState({
                    displayError:true
                })
            }
            else if((phrase_d1.length>0 && phrase_d2.length>0) || (phrase_d1.length===0 && phrase_d2.length===0))
            {
                this.setState({
                    displayError:false,
                    disableBtn:true
                },()=>{
                    let Name_of_Annotator = this.state.nameAnno;
                    let file1 = this.state.fileName1;
                    let file2 = this.state.fileName2;
                    let scores = this.state.defaultlist;
                    //console.log(selected_d1);
                    //console.log(selected_d2);
                    fetch('https://lat-ds-44a95-default-rtdb.firebaseio.com/Document-Similarity.json',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            file1,
                            file2,
                            Name_of_Annotator,
                            scores,
                            selected_d1,
                            selected_d2
                        })
                       })
                })
            }
            
            }
            else if(this.state.default===false && this.state.custom===true)
            {
                let inputData3 = this.state.phraseH1;
                let selected_d1 = [];
                let phrase_d1=[];
                for(let r=0;r<inputData3.length;r++)
                {
                    if(inputData3[r].highlighted.length > 0)
                    {
                        let sent = inputData3[r].sentence;
                    for( let h=0;h<inputData3[r].highlighted.length;h++)
                    {
                    let ind = sent.indexOf(inputData3[r].highlighted[h]);
                      let len = inputData3[r].highlighted[h].length;
                      let st = ind;
                      let end  = ind + len;
                      //starting check
                      let dummystr = ""
                      for(let xx=st-1;xx>=0;xx=xx-1)
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
                          let rev = dummystr.split('').reverse().join('')
                        let ccsent = inputData3[r].highlighted[h];
                        let final = rev + ccsent;
                        inputData3[r].highlighted[h] = final;
                      }
                      //endcheck
                      let dummyendstr = ""
                      for(let tt=end;tt<inputData3[r].sentence.length;tt++)
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
                          let ttsent = inputData3[r].highlighted[h];
                          let finalend = ttsent + dummyendstr;
                          inputData3[r].highlighted[h] = finalend
                      }
                      
                    }
                    let myobj={
                        highlightedParts:inputData3[r].highlighted,
                        sentence : inputData3[r].sentence
                    }
                    selected_d1.push(myobj);
                        for(let t=0;t<inputData3[r].highlighted.length;t++)
                        {
                            phrase_d1.push(inputData3[r].highlighted[t])
                        }
                    }
                }
                //phraseH2
                let inputData4 = this.state.phraseH2;
                let selected_d2 = [];
                let phrase_d2=[];
                for(let x=0;x<inputData4.length;x++)
                {
                    if(inputData4[x].highlighted.length > 0)
                    {
                        let sent = inputData4[x].sentence;
                    for( let h=0;h<inputData4[x].highlighted.length;h++)
                    {
                    let ind = sent.indexOf(inputData4[x].highlighted[h]);
                      let len = inputData4[x].highlighted[h].length;
                      let st = ind;
                      let end  = ind + len;
                      //starting check
                      let dummystr = ""
                      for(let xx=st-1;xx>=0;xx=xx-1)
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
                          let rev = dummystr.split('').reverse().join('')
                        let ccsent = inputData4[x].highlighted[h];
                        let final = rev + ccsent;
                        inputData4[x].highlighted[h] = final;
                      }
                      //endcheck
                      let dummyendstr = ""
                      for(let tt=end;tt<inputData4[x].sentence.length;tt++)
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
                          let ttsent = inputData4[x].highlighted[h];
                          let finalend = ttsent + dummyendstr;
                          inputData4[x].highlighted[h] = finalend
                      }
                    }
                    let myobj={
                        highlightedParts:inputData4[x].highlighted,
                        sentence : inputData4[x].sentence
                    }
                    selected_d2.push(myobj);
                        for(let y=0;y<inputData4[x].highlighted.length;y++)
                        {
                            phrase_d2.push(inputData4[x].highlighted[y])
                        }
                    }
                }
                if((phrase_d1.length!==0 && phrase_d2.length===0) || (phrase_d1.length===0 && phrase_d2.length!==0))
            {
                this.setState({
                    displayError:true
                })
            }
            else if((phrase_d1.length>0 && phrase_d2.length>0) || (phrase_d1.length===0 && phrase_d2.length===0))
            {
                this.setState({
                    displayError:false,
                    disableBtn:true
                },()=>{
                    let Name_of_Annotator = this.state.nameAnno;
                    let file1 = this.state.fileName1;
                    let file2 = this.state.fileName2;
                    let scores = this.state.customList;
                    
                    fetch('https://lat-ds-44a95-default-rtdb.firebaseio.com/Document-Similarity.json',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            file1,
                            file2,
                            Name_of_Annotator,
                            scores,
                            selected_d1,
                            selected_d2
                        })
                       })
                })
            }
                
            }
        }else if(this.state.continue===true && this.state.new===false)
        {
                    let Name_of_Annotator = this.state.nameAnno;
                    let file1 = this.state.fileName1;
                    let file2 = this.state.fileName2;
                    let scores;
                    let selected_d1=this.state.phraseH1;
                    let selected_d2=this.state.phraseH2;
                    if(this.state.defaultlist.length>0)
                    {
                        scores=this.state.defaultlist;
                    }
                    else{
                        scores=this.state.customList;
                    }
                    this.setState({
                        disableBtn:true
                    })
                    fetch('https://lat-ds-44a95-default-rtdb.firebaseio.com/Document-Similarity.json',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            file1,
                            file2,
                            Name_of_Annotator,
                            scores,
                            selected_d1,
                            selected_d2
                        })
                       })

                

                      
        }
        
        
    }
    
     onScorechange = (e,label)=>{
         if(this.state.default===false && this.state.custom===true){
         console.log(label)
         var arr = this.state.customList;
        for(var j=0;j<arr.length;j++)
        {
            if(arr[j].label === label)
            {
                arr[j].score=e.target.value;
            }
        }
        this.setState({
            customList:arr
        },()=>{
            console.log(this.state.customList)
        })
        }
        else if(this.state.default===true && this.state.custom===false)
        {
            let arr = this.state.defaultlist;
        for(let j=0;j<arr.length;j++)
        {
            if(arr[j].label === label)
            {
                arr[j].score=e.target.value;
            }
        }
        this.setState({
            defaultlist:arr
        })
        }
     }
     newAnno=()=>{
         this.setState({
             new:true,
             continue:false,
             showcn:false
         })
     }
     continueAnno=()=>{
         this.setState({
             continue:true,
             new:false,
             showcn:false
         },()=>{
            fetch('https://lat-ds-44a95-default-rtdb.firebaseio.com/Document-Similarity.json',{
                method:'GET'
            })
            .then((resp)=>{
                return resp.json();
            })
            .then((ans)=>{
                let deleteKey;
               var key=Object.keys(ans);
               //console.log(ans[key].data);
               let g=0;
               var found=false;
               
               for(;g<key.length;g++)
               {
                   if(ans[key[g]].Name_of_Annotator===this.state.nameAnno && ((ans[key[g]].file1===this.state.fileName1 && ans[key[g]].file2===this.state.fileName2) || (ans[key[g]].file1===this.state.fileName2 && ans[key[g]].file2===this.state.fileName1) ))
                   {
                    let anskeys=Object.keys(ans[key[g]]);
                         if(this.state.default===true && this.state.custom===false)
                         {
                             if(ans[key[g]].file1===this.state.fileName1 && ans[key[g]].file2===this.state.fileName2){
                                 
                                 if('selected_d1'  in ans[key[g]] && 'selected_d2' in ans[key[g]]){
                             this.setState({
                                defaultlist:ans[key[g]].scores,
                                phraseH1:ans[key[g]].selected_d1,
                                phraseH2:ans[key[g]].selected_d2
                             },()=>{
                                 /*console.log(this.state.defaultlist);
                                 console.log(this.state.phraseH1);
                                 console.log(this.state.phraseH2);*/
                             })
                             deleteKey=key[g];
                             found=true;
                             break;
                             }else{
                                this.setState({
                                    defaultlist:ans[key[g]].scores,
                                    phraseH1:[],
                                    phraseH2:[]
                                 },()=>{
                                     /*console.log(this.state.defaultlist);
                                     console.log(this.state.phraseH1);
                                     console.log(this.state.phraseH2);*/
                                 })
                                 deleteKey=key[g];
                                 found=true;
                                 break;
                             }
                            }
                            else{
                                
                                 if('selected_d1'  in ans[key[g]] && 'selected_d2' in ans[key[g]]){
                                this.setState({
                                    defaultlist:ans[key[g]].scores,
                                    phraseH2:ans[key[g]].selected_d1,
                                    phraseH1:ans[key[g]].selected_d2
                                 },()=>{
                                     /*console.log(this.state.defaultlist);
                                     console.log(this.state.phraseH1);
                                     console.log(this.state.phraseH2);*/
                                 })
                                 deleteKey=key[g];
                                 found=true;
                                 break;
                                }else{
                                    this.setState({
                                        defaultlist:ans[key[g]].scores,
                                        phraseH2:[],
                                        phraseH1:[]
                                     },()=>{
                                         /*console.log(this.state.defaultlist);
                                         console.log(this.state.phraseH1);
                                         console.log(this.state.phraseH2);*/
                                     })
                                     deleteKey=key[g];
                                     found=true;
                                     break;
                                }
                            }
                         }
                         else{
                             if(ans[key[g]].file1===this.state.fileName1 && ans[key[g]].file2===this.state.fileName2){
                                if('selected_d1'  in ans[key[g]] && 'selected_d2' in ans[key[g]]){
                                this.setState({
                                customList:ans[key[g]].scores,
                                phraseH1:ans[key[g]].selected_d1,
                                phraseH2:ans[key[g]].selected_d2
                             },()=>{
                                /*console.log(this.state.customList);
                                console.log(this.state.phraseH1);
                                 console.log(this.state.phraseH2);*/
                             })
                             deleteKey=key[g];
                             found=true;
                             break;
                             }else{
                                this.setState({
                                    customList:ans[key[g]].scores,
                                    phraseH1:[],
                                    phraseH2:[]
                                 },()=>{
                                    /*console.log(this.state.customList);
                                    console.log(this.state.phraseH1);
                                     console.log(this.state.phraseH2);*/
                                 })
                                 deleteKey=key[g];
                                 found=true;
                                 break;
                             }
                             }else{
                                if('selected_d1'  in ans[key[g]] && 'selected_d2' in ans[key[g]]){
                                this.setState({
                                    customList:ans[key[g]].scores,
                                    phraseH2:ans[key[g]].selected_d1,
                                    phraseH1:ans[key[g]].selected_d2
                                 },()=>{
                                    /*console.log(this.state.customList);
                                    console.log(this.state.phraseH1);
                                     console.log(this.state.phraseH2);*/
                                 })
                                 deleteKey=key[g];
                                 found=true;
                                 break;
                                }else{
                                    this.setState({
                                        customList:ans[key[g]].scores,
                                        phraseH2:[],
                                        phraseH1:[]
                                     },()=>{
                                        /*console.log(this.state.customList);
                                        console.log(this.state.phraseH1);
                                         console.log(this.state.phraseH2);*/
                                     })
                                     deleteKey=key[g];
                                     found=true;
                                     break;
                                }
                              }
                        }
                   }
               }
               fetch(`https://lat-ds-44a95-default-rtdb.firebaseio.com/Document-Similarity/${deleteKey}.json`,{
                   method:'DELETE'
               })
               

            })
            
         })
     }
    render(){

        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <TextSelector
                  events={[
                 {
                      text: 'Highlight',
                      handler: this.handler
                  },
                 ]}
                color={'yellow'}
                 colorText={true}
                 />
                <div className="Icon" >
                <FaHome color="white" size="1.9rem" onClick={() => window.location.reload(false)}/>
                </div>
                <div className="Header" >
                <h1 style={{color:'white',marginTop:'5px'}}>Document Similarity</h1>
                </div>
                <div className="Impmsg">
                    <h3 style={{color:'black'}}>If you select continue scores,please do not highlight any new sentences as they will not get saved!Only the scores will get Edited and Saved. </h3>
                    </div>
                {this.state.default===true && this.state.custom===false?<div>
                    {!this.state.display?<button className="ButtonFetch" onClick={this.begin}>Click here to Fetch Data</button>:null}
                    {this.state.continue===false && this.state.new===false && this.state.showcn===true?
                <div>
                    
                    <button className="ButtonFetch" onClick={this.continueAnno}>Continue Scores</button>
                    <button className="ButtonFetch" onClick={this.newAnno}>New Scores</button>
                </div>:null}
                {this.state.display?
                <div className="Similarity">
                    
                <div className="DisplayData1">
                
                    <div className="Header">
                    <h2 style={{color:'white'}}>{this.state.fileName1}</h2>
                    </div>
                    
                {this.state.arrayContent1.length>0?this.state.arrayContent1.map((element)=>{
                      
                      return(
                               <p style={{color:'white'}}  onMouseDown={()=>this.setState({currentFile:'f1',currentElement:element})} key={element}>{element}</p>
                      )
                }):null}
                </div>
                
                {this.state.new===true?
                <div className="MiddleColumn">
                {this.state.defaultlist.map(el=>{
                       if(el!=="None"){
                       return(
                           <div key={el.label}>
                       <h3>{el.label}</h3>
                       <input style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type='number' onChange={(e)=>this.onScorechange(e,el.label)} />
                       </div>
                       )
                       }
                       else{
                           return null;
                       }
                   })}
                    
                </div>:null}
                {this.state.continue===true?
                
                
                <div className="MiddleColumn">
                    
                {this.state.defaultlist.map(el=>{
                       if(el!=="None"){
                       return(
                           <div key={el.label}>
                       <h3>{el.label}</h3>
                       <input style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type='number' value={el.score} onChange={(e)=>this.onScorechange(e,el.label)} />
                       </div>
                       )
                       }
                       else{
                           return null;
                       }
                   })}
                    
                </div>
                :null

                }
                
                
                <div className="DisplayData2">
                
                
                    <div className="Header">
                    <h2 style={{color:'white',textAlign:'center'}} >{this.state.fileName2}</h2>
                    </div>
                
                {this.state.arrayContent2.length>0?this.state.arrayContent2.map((element)=>{
                      return(
                          
                              <p key={element} style={{color:'white'}} onMouseDown={()=>this.setState({currentFile:'f2',currentElement:element})}>{element}</p>
                          
                      )
                }):null}
                </div>
            </div>:null}
            {this.state.displayError?
                     <div className="Error">
            <h5 >Please Highlight sentences in both documents and click on save to save Data</h5>
                  </div>
             :null}
            {this.state.display?
            <div style={{display:'flex',flexDirection:'row'}}>
            {this.state.display?<button onClick={this.postData} disabled={this.state.disableBtn} className={this.state.disableBtn?"DisableBtn":"ButtonSS"}>{this.state.disableBtn?"Saved":"Save"}</button>:null}
            {this.state.display?<button onClick={this.props.reset} className="ButtonCNF">Choose new files</button>:null}
            
            
            </div>:null}
            
            
                </div>:null}
                {this.state.default===false &&this.state.custom===true?
                <div>
                    
                    {!this.state.display?<button className="ButtonFetch" onClick={this.begin}>Click here to Fetch Data</button>:null}
                    {this.state.continue===false && this.state.new===false&&this.state.showcn===true?
                <div>
                    <div className="Impmsg">
                    <h3 style={{color:'black'}}>If u Select Continue Scores,Please do not highlight any new sentences as they will not get Saved </h3>
                    </div>
                    <button className="ButtonFetch" onClick={this.continueAnno}>Continue Scores</button>
                    <button className="ButtonFetch" onClick={this.newAnno}>New Scores</button>
                </div>:null}
                {this.state.display?
                <div className="Similarity">
                    
                <div className="DisplayData1">
                
                
                    <div className="Header">
                    <h2 style={{color:'white'}}>{this.state.fileName1}</h2>
                    </div>
                    
                {this.state.arrayContent1.length>0?this.state.arrayContent1.map((element)=>{
                      
                      return(
                               <p style={{color:'white'}}  onMouseDown={()=>this.setState({currentFile:'f1',currentElement:element})} key={element}>{element}</p>
                      )
                }):null}
                </div>
                
                {this.state.new===true?
                <div className="MiddleColumn">
                   {this.state.customList.map(el=>{
                       if(el!=="None"){
                       return(
                           <div key={el.label}>
                       <h3>{el.label}</h3>
                       <input style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type='number' onChange={(e)=>this.onScorechange(e,el.label)} />
                       </div>
                       )
                       }
                       else{
                           return null;
                       }
                   })}
                </div>:null}
                {this.state.continue===true?
                
                
                <div className="MiddleColumn">
                {this.state.customList.map(el=>{
                    if(el!=="None"){
                    return(
                        <div key={el.label}>
                    <h3>{el.label}</h3>
                    <input style={{color:'white',backgroundColor:'black',borderRadius:'5px'}} type='number' value={el.score} onChange={(e)=>this.onScorechange(e,el.label)} />
                    </div>
                    )
                    }
                    else{
                        return null;
                    }
                })}
             </div>:null}
                <div className="DisplayData2">
                
                    <div className="Header">
                    <h2 style={{color:'white',textAlign:'center'}} >{this.state.fileName2}</h2>
                    </div>
                
                {this.state.arrayContent2.length>0?this.state.arrayContent2.map((element)=>{
                      return(
                          
                              <p key={element} style={{color:'white'}} onMouseDown={()=>this.setState({currentFile:'f2',currentElement:element})}>{element}</p>
                          
                      )
                }):null}
                </div>
            </div>:null}
            
            {this.state.displayError?
            <div className="Error">
                <h5 >Please Highlight sentences in both documents and click on save to save Data </h5>
            </div>
            :null}
            {this.state.display?
            <div style={{display:'flex',flexDirection:'row'}}>
            {this.state.display?<button onClick={this.postData} disabled={this.state.disableBtn} className={this.state.disableBtn?"DisableBtn":"ButtonSS"}>{this.state.disableBtn?"Saved":"Save"}</button>:null}
            {this.state.display?<button onClick={this.props.reset} className="ButtonCNF">Choose new files</button>:null}

            </div>:null}
            </div>:null}
            
            
            
            </div>
        )
    }
}
export default Similarity;
// <div className="DisplayData">
/*{this.state.inputArr.map((element)=>{
    return(
        <input type="text"  placeholder="Enter val" />
    )
})}
</div>*/
//onClick
//<Highlight text={element}/>