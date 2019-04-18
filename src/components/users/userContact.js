import React from 'react'
import axios from 'axios'
import {Container, Card, Icon, Button} from 'semantic-ui-react'
import Auth from '../../lib/auth'

class UserContact extends React.Component {

  constructor() {
    super()

    this.state = {
      showbutton: false ,
      currentUser: {

      },
      user: {
      }

    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getUser()
    this.getUserInfo()
  }

  getUserInfo() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({  user: res.data }))
  }


  addAltProfile(e){
    e.target.src = 'http://www.orjon.com/dev/booker/images/profile/noimage.jpg'
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`/api/users/${this.props.match.params.id}/follow`,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getUserInfo())
      .then(() =>this.setState({ showButton: true }))
      .catch(err => console.log(err))
  }

  getUser() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        console.log(res, 'getting user')
        this.setState({ currentUser: res.data })
      })
  }

  render() {
    console.log(this.state, 'state')
    if (!this.state.user) return null
    console.log(Auth.getPayload().sub)
    console.log(this.state.currentUser, 'i am currentuser')
    const {user} = this.state
    console.log(user, 'user')
    return (
      <main>
        <Container style={{ marginTop: '3em' }}>
        
          <Card fluid>

            <Card.Content>
              <Card.Header>User profile <Icon name='user' />
                {this.state.showButton ?
                  <Button  className= "ui mini basic button " floated='right' onClick={this.handleSubmit}>
                    <span>Followed  <Icon name='check' /></span>
                  </Button>
                  :   <Button  className= "ui mini basic button " floated='right' onClick={this.handleSubmit}>
                    <span>Follow  <Icon name='rss' /></span>
                  </Button>}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <h4>About: </h4>
                <p>{user.profile_description ? user.profile_description: 'No description submitted'}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card image={user.profile_picture}/>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <h4>Username:</h4>
                <p>{user.username}</p>
                {Auth.isAuthenticated()  &&
                  <div>
                    <h4>Email: </h4>
                    <p><a href={'mailto:' + user.email }> {user.email} </a>
                    </p>
                  </div>
                }
              </Card.Description>
            </Card.Content>
            {!Auth.isAuthenticated()  &&
                <Card.Content>
                  <Card.Description>

                    <p>{'You must be logged in to view this user\'s email address.'}
                    </p>
                  </Card.Description>
                </Card.Content>
            }

          </Card>

        </Container>

      </main>
    )
  }
}

export default UserContact
