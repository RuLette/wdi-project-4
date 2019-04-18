import React from 'react'
import axios from 'axios'
import {Container, Card, Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const moment = require('moment')

class UserProfile extends React.Component {

  constructor() {
    super()

    this.state = {
      user: {

      }
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => this.setState({  user: res.data }))
  }


  isOwner() {
    return Auth.isAuthenticated() && this.state.qraft.user._id === Auth.getPayload().sub
  }

  addAltProfile(e){
    e.target.src = 'http://www.orjon.com/dev/booker/images/profile/noimage.jpg'
  }

  handleDelete(e) {
    e.preventDefault()
    if (window.confirm('Delete your account?')) {
      axios.delete(`/api/users/${Auth.getPayload().sub}`,
        { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(() => {
          Auth.logout()
          this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }
  }

  // <p>{user.followed.map(follower => follower.followed).join(', ')}</p>
  render() {
    console.log(this.state, 'state')
    if (!this.state.user) return null
    const {user} = this.state
    return (
      <main>
        <Container style={{ marginTop: '3em' }}>
          <Card fluid>
            <Card.Content>

              <Button.Group floated='right'>
                <button  className= "ui mini basic button " attached='left'>
                  <Link to={`/user/${Auth.getPayload().sub}/edit`}>Edit </Link>
                </button>
                <button  className= "ui mini basic button " attached='right' onClick={this.handleDelete}>
                Delete Account
                </button>
              </Button.Group>

            </Card.Content>
            <Card.Content>
              <Card.Header>Your profile</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <h4>About: </h4>
                <p>{user.profile_description}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card image={user.profile_picture} onError={this.addAltProfile}/>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <h4>Username:</h4>
                {user.username}

                <h4>Email:</h4>
                <p>{user.email}</p>

                <h4>Joined: </h4>
                <p>{moment(user.created_at).format('MMM Do YYYY')}</p>

              </Card.Description>
            </Card.Content>

          </Card>
        </Container>
      </main>
    )
  }
}

export default UserProfile
