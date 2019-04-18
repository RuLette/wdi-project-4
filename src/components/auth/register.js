import React from 'react'
import { Container, Grid, Header, Form, Segment, Button, Message} from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile_picture: '',
        profile_description: ''
      },
      errors: {}
    }

    this.mapCenter = {
      lat: 51.5,
      lng: -0.11
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange({ target: { name , value }}) {
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({errors: err.response.data.errors}))
  }


  render() {
    console.log(this.state.errors)
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Container style={{ marginTop: '2em', marginBottom: '5em' }}>
            <div className="container">
              <Header as='h2' color="black" textAlign='center'>
                Join now
              </Header>

              <Form size='large'
                onSubmit={this.handleSubmit}
              >
                <Segment stacked>
                  <Form.Field>
                    <Form.Input fluid icon='user' iconPosition='left'
                      className="input"
                      name="username"
                      placeholder="* Username"
                      value={this.state.data.username}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input fluid icon='mail' iconPosition='left'
                      className="input"
                      name="email"
                      placeholder="*Email address"
                      value={this.state.data.email}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input fluid icon='lock' iconPosition='left'
                      className="input"
                      name="password"
                      type="password"
                      placeholder="*Password"
                      value={this.state.data.password}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input fluid icon='lock' iconPosition='left'
                      className="input"
                      name="password_confirmation"
                      type="password"
                      placeholder="*Password Confirmation"
                      value={this.state.data.password_confirmation}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <h3>Optional fields </h3>
                  <Form.Field>
                    <Form.Input fluid
                      className="input"
                      name="profile_picture"
                      placeholder="Submit a profile photo (url)"
                      value={this.state.data.profile_picture}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input fluid
                      className="input"
                      name="profile_description"
                      placeholder="Please add a profile description"
                      value={this.state.data.profile_description}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Button basic color='black' fluid>Join Now</Button>
                </Segment>
              </Form>
              <Message>
           Already a user? <Link to="/login" className="active item">  <span> &nbsp; Login</span></Link>
              </Message>
            </div>
          </Container>
        </Grid.Column>
      </Grid>

    )
  }
}
export default Register
