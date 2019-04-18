import React from 'react'
import axios from 'axios'
import { Container, Form, Grid, Segment, Button, Header, Message, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: { email: '',
        password: ''
      },
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res=> {
        Auth.setToken(res.data.token)
        this.props.history.push('/qrafts')
      })

      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () =>
          console.log('this.state', this.state))
      })
  }

  render() {
    console.log(this.state.data)
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <div className="container">
            <Header as='h2' color="black" textAlign='left'>
              Log-in to your account
            </Header>
            <Form size='large'
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <div>
                  <Form.Field>

                    <Form.Input fluid icon='user' iconPosition='left'
                      className="input"
                      name="email"
                      placeholder="*E-mail address"
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
                    { this.state.error ? <h4>ERROR: {this.state.error}</h4> : null }

                  </Form.Field>

                  <Button basic color='black' fluid>Login</Button>

                </div>
              </Segment>

            </Form>
            <Message>
         New to us? <Link to="/register" className="active item">  <span> &nbsp; Register</span></Link>
            </Message>
          </div>

        </Grid.Column>
      </Grid>
    )
  }
}
export default Login
