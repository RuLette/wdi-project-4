import React from 'react'
import axios from 'axios'
import {Container, Card, Header} from 'semantic-ui-react'
import Auth from '../../lib/auth'
import UserForm from './userForm'

class UserEdit extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      user: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(err => console.log(err))
  }


  isOwner() {
    return Auth.isAuthenticated() && this.state.qraft.user._id === Auth.getPayload().sub
  }
  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/users/${Auth.getPayload().sub}`,
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/user'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    if (!this.state.user) return null
    const {user} = this.state
    console.log(user)

    return (
      <main>
        <Container style={{ marginTop: '3em' }}>
          <Header as='h2' >Edit profile</Header>
          <UserForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={this.state.data}
            user={this.state.user}
            errors={this.state.errors}
          />

        </Container>
      </main>
    )
  }
}

export default UserEdit
