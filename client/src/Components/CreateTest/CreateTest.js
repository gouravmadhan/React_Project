import React,{Component} from 'react';
import { createTest ,addQuestionToDatabase } from '../UserFunctions/userFunctions.js';
class CreateTest extends Component 
{
  constructor()
  {
    super();
    this.state={
      testKey : 0,
      question :'',
      A:'',
      B:'',
      C:'',
      D:'',
      correctAnswer:''
    }
  }
  
  componentDidMount()
  {
   if(!localStorage.usertoken)
    {
      alert("Login First")
      this.props.history.push('/')
    }
    else
    {
      var key= createTest()
      this.setState({testKey:key})
    }
  }
    
  readKey= (e)=>
  {
    this.setState({testKey: e.target.value});
  }

  changeHandler =(e)=>{
    this.setState({[e.target.id] : e.target.value})
  }

  addQuestion = () =>
  {
    const ques={
      question : this.state.question,
      A: this.state.A,
      B: this.state.B,
      C: this.state.C,
      D: this.state.D,
    }
    const answer = this.state.correctAnswer
    const key = this.state.testKey
    addQuestionToDatabase(ques,answer,key).then(res=>
      {
        if(res.error)
        {
          alert(res.error)
          this.props.history.push('/profile')
        }
        else{
          alert(res)
        }
      });
    
  }
  submitTest = () =>
  {
    alert('Submitted')
    this.props.history.push(`/profile`)
  }
  render()
  {
    return(
      <div className="container ">
      <div className="row my-2"> 
      <div className="col-6 offset-3">
        <label><b>Test Key</b></label>
          <input type="text" className="form-control" value={this.state.testKey} onChange={this.readKey}></input><br/>
        </div>
      </div>
      <div className="row">
      <div className="col-6 offset-3">
      <label><b>Enter Question</b></label>
        <textarea id="question" className="form-control" placeholder="Enter Question..." onChange={this.changeHandler}></textarea><br/>
        </div>
        </div>
        <div className="row">
      <div className="col-3 offset-3">
          <label><b>A</b></label>
          <input className="form-control" type="text" id='A' onChange={this.changeHandler}></input><br/>
        </div>
        <div className="col-3">
          <label><b>B</b></label>
          <input className="form-control" type="text" id='B' onChange={this.changeHandler}></input><br/>
        </div>
      </div>
      <div className="row">
      <div className="col-3 offset-3">
        <label><b>C</b></label>
        <input className="form-control" type="text" id='C' onChange={this.changeHandler}></input><br/>
        </div>
        <div className="col-3">
        <label><b>D</b></label>
        <input className="form-control" type="text" id='D' onChange={this.changeHandler}></input><br/>
        </div>
      </div>
      <div className="row">
      
      </div>
      <div className="row">
      <div className="col-6 offset-3">

        <label><b>Correct Answer</b></label><input type="text" id='correctAnswer' className="form-control" onChange={this.changeHandler}></input>
        </div>
        </div>
        <div className="row my-5">
        <div className="col-2 offset-3">
          <button className="btn btn-danger btn-block" onClick={this.addQuestion}>Add Question</button>
        </div>
        <div className="offset-2 col-2">
        <button className="btn btn-block btn-success" onClick={this.submitTest}>Submit Test</button>
        </div>
        </div>
      </div>
      )
  }

}
export default CreateTest
