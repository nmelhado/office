import React, {Component} from 'react'
import {render} from 'react-dom'
import axios from 'axios'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      departments: [],
      department: {},
      users: [],
      user: {}
    }
    this.setUsers = this.setUsers.bind(this)
  }
  async setUsers(id) {
    const usrs = await axios.get('/api/departmentUsers/'+id)
    const users = usrs.data
    const department = id
    this.setState({ department, users })
  }
  async componentDidMount() {
    const depts = await axios.get('/api/departments')
    const departments = depts.data
    this.setState( {departments } )
  }
  render() {
    return (
      <ul>
        {this.state.departments.map(department => <li key={department.id} onClick={() => this.setUsers(department.id)}>{department.name}{this.state.department === department.id ? <ul>{this.state.users.map(user => <li key={user.id}>{user.name}</li>)}</ul>: ''}</li>)}
      </ul>
    )
  }
}

render(
  <Main />,
  document.getElementById('app')
)