import React from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './Components/Login/login.js';
import LoadTest from './Components/LoadTest/LoadTest.js';
import Test from './Components/Test/test.js';
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Landing from './Components/Landing'
import Teacher from './Components/Teacher/Teacher.js'
import CreateTest from './Components/CreateTest/CreateTest.js';
import Marks from './Components/Marks/marks.js'
import NotFound from './Components/notFound.js'
function App() {  
  return (
    <Router>
  	<Navbar />
      <Switch>
        < Route exact path='/' component={Landing}/>
        < Route exact path='/login' component={Login}/>
        < Route exact path="/register" component={Register} />
        < Route exact path="/profile" component={Profile} />
        < Route exact path="/student" component={LoadTest}/>
        < Route exact path="/student/test/:key" component={Test}/>
        < Route exact path="/teacher" component={Teacher}/>
        < Route exact path="/view" component={Marks}/>
        < Route exact path="/teacher/create" component={CreateTest}/>
        < Route component = {NotFound}/>
      </Switch>
    </Router>
  )
}

export default App;
