import React , { useState, useEffect } from 'react';
import { getResult } from '../UserFunctions/userFunctions';
const Marks = (props)=>
{
    const [key,setKey] = useState('');
    const [response,setResponse] = useState([]);
    useEffect(()=>{
        if(!localStorage.usertoken)
        {
            props.history.push('/login')
        }
    })
    const submitKey = ()=>{
        getResult(key)
        .then(res=>{
            console.log(res)
            if(res.error)
            {
                alert(res.error);
                props.history.push('/')
            }
            else
            {
                setResponse(res);
                console.log(res)
            }
        });
    }
    return(
        <div>
            <div className="container">
                <div className="row my-2 d-flex">
                    <div className="col-5">
                    <input type="text" className="form-control" placeholder="Enter Your Key Here" onChange={e=>setKey(e.target.value)}/>
                    <button onClick={submitKey} className="btn btn-sm my-1 btn-success">Submit</button>
                    </div>
                </div>
            </div>
            
            <div className="container">
             <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Score</th>
                    </tr>
                </thead>
               { 
                    response.map((obj,i)=>{
                    return(
                        <tr>
                        <td>{obj.first_name}</td>
                        <td>{obj.last_name}</td>
                        <td>{obj.email}</td>
                        <td>{obj.score}</td>
                        </tr>
                       )
                    })
               }
              </table>
            </div>
        </div>


        )
}
export default Marks;