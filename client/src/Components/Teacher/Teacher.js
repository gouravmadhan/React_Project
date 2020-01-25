import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Teacher extends Component 
{
  componentDidMount()
  {
  	if(!localStorage.usertoken)
  	{
  		this.props.history.push('/login')
  	}
  }
  render()
  {
    return(
      <div>      
        <Link to='/teacher/create'><button>Create Test</button></Link>
        <Link to='/teacher/view'><button>View Marks</button></Link>
      </div>
      )
  }

}
export default Teacher
