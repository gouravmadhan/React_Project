import React, { Component } from 'react'
import {getProfile} from './UserFunctions/userFunctions'
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }

  async componentDidMount() {
    const token = localStorage.usertoken
    if(!token)
    {
      alert('Please Log In First')
      this.props.history.push(`/login`)
    }
    else
    {
      const data = await getProfile();
      if(data.data === 'Forbidden')
      {
        this.props.history.push('/login')
      }
      else
      {
        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        })
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile
