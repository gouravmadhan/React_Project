import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
const LoadTest = (props) => {

  const [key,setKey] = useState();
  useEffect(()=>{
  	if(!localStorage.usertoken)
  	{
  		props.history.push('/login')
  	}

  },[])
   return (
    <div className="container mt-5 offset-4">
    <div className="row">
     <div className="col-5">
     <h3><label className="mx-2">Enter Key To Start The Test</label></h3>
     <div className="input-group">
      <input className="form-control " type="text" onChange={e => setKey(e.target.value)}></input>
      <Link to={"/student/test/"+key} className="btn btn-success">Submit</Link>
      </div>
      </div>
    </div>
    </div>
  )
}

export default LoadTest;


