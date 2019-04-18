import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Card, Container, Image} from 'semantic-ui-react'
import Auth from '../../lib/auth'

class QraftTest extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {
        followed: [],
        followers: []
      },
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/users',
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push(`/qrafts/${this.props.match.params.id}`))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        console.log(res)
        this.setState({ user: res.data })
      }
      )
  }

  // testing followers

  render() {
    const {user} = this.state
    {user && console.log(user)}
    if(!user) return null
    return (
      <Container>
        <div>

          <button onSubmit={this.handleSubmit}>Like</button>

          <div>
            <p> Your followers:
              {user.followers.map(follower => (
                follower.followed).join(
                ',')
              )}
            </p>
          </div>

        </div>
      </Container>
    )
  }
}

export default QraftTest
