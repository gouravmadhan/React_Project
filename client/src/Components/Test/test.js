import React , { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { submit } from '../UserFunctions/userFunctions';

const Test = (props)=>{
    const [questions,setQuestions] =  useState([]);
    const [currentQuestion , setCurrentQuestion ] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [load,setLoad] = useState(0); 
    const [answers,setAnswers] = useState([]);
    const [key,setKey] = useState(0);
    useEffect(()=>{
        if(!localStorage.usertoken)
        {
            props.history.push('/login')
        }
    })
    useEffect(()=>{ 
    setKey(props.match.params.key);  
    axios.post('http://localhost:5000/protected/getQuestions',{
        key : props.match.params.key
    },{
        headers : {
            'authorization' : localStorage.usertoken
        }
    })
    .then((res)=>{
      if(res.data === 'Not Found')
        {
            alert("Wrong Key")
            setLoad(-1);
        }
      else
      {
          setQuestions(res.data);
          setLoad(1);
      }
    })  // eslint-disable-next-lines
  },[])
  
    useEffect(()=>{
        setCurrentQuestion(questions[questionIndex]);
    },[questionIndex,questions]);

    const nextQuestion = (e) =>
    {
        if(questionIndex+1<questions.length)
        {
            setQuestionIndex(questionIndex+1);            
        }
    }

    const prevQuestion = () =>
    {
        if(questionIndex-1>=0)
        {
            setQuestionIndex(questionIndex-1);
            setCurrentQuestion(questions[questionIndex-1]);
        }
    }

    const submitTest = () =>
    {
        const token = localStorage.usertoken;
        const data = jwt_decode(token);
        const first_name = data.first_name;
        const last_name = data.last_name;
        const email = data.email;
        const user ={
            first_name : first_name,
            last_name : last_name,
            email : email,
        }
        submit(answers,user,key)
        .then(res=>{
            if(res.err)alert(res.err)
            else
            {
                alert("Test Submitted");
                props.history.push(`/profile`)
            }  
        })
    }


    const selectOption = (e) =>
    {
        let a = answers;
        a[questionIndex] = e.target.value
        setAnswers(a)
    }
    const showNext = questionIndex + 1 === questions.length ? true : false
    const showPrev = questionIndex  === 0 ? true : false 
    if(load===1)
    {
        return (
            <div>
                <div className="container my-2">
                    <h4><b>Question No. {questionIndex+1}</b></h4>
                    Q:- {currentQuestion.question}<br/>

                    <div className="form-check">
                        <input type="radio" className="form-check-input" name='options' value={currentQuestion.A} id="a" onClick={selectOption}/>
                        <label className="form-check-label">{currentQuestion.A}</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input"  name='options' value={currentQuestion.B} id="b" onClick={selectOption}/>
                        <label className="form-check-label">{currentQuestion.B}</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input"  name='options' value={currentQuestion.C} id="c" onClick={selectOption}/>
                        <label className="form-check-label">{currentQuestion.C}</label>
                    </div>
                    <div className="form-check mb-3">
                        <input type="radio" className="form-check-input"  name='options' value={currentQuestion.D} id="d" onClick={selectOption}/>
                        <label  className="form-check-label">{currentQuestion.D}</label>
                    </div>
                    <button className="btn btn-sm btn-success mx-2" disabled={showPrev} id="prev" onClick = {prevQuestion}>prev</button>
                    <button className="btn btn-sm btn-warning mx-2" disabled={showNext} id="next" onClick = {nextQuestion}>next</button>
                    <button  className="btn btn-sm btn-danger mx-2" onClick = {submitTest}>Submit Test</button>

                </div>
            </div>
        )
    }
    else
    {
        if(load===0)
        return(
            <h1>Waiting</h1>
        )
        else{
            return(
                <Redirect to = '/student'/>
            )
        }
    }
}

export default Test;