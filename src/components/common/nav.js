import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Icon } from 'semantic-ui-react'
import Auth from '../../lib/auth'


class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <nav>
          <div className="ui text menu">
            <img src="https://lh3.googleusercontent.com/YJsNyKP1bE62olXmx0y_h_R52VcRnl2IKH0kJjGaXjj5s9OHSXakImdmhgDsbQy72BmZnkW3yIJ0EWoqmIhGDrwnlrqlzdELSXBz1EA0upgu_sb3RBnTyIy9aQAZxcypYQCsynzJ=w2400" className="qraftylogo"/>
            <Link to="/" className="active item">Home</Link>
            <Link to="/qrafts" className="active item">Qrafts</Link>
            {Auth.isAuthenticated() && <Link to="/qrafts/new" className="active item">Post a Qraft</Link>}
            <div className="right menu">
              {Auth.isAuthenticated() && <Link to="/user" className="active item"><Icon name='user' />Profile</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="active item">Login</Link>}
              {!Auth.isAuthenticated() && <Link to="/register" className="active item">Register</Link>}
              {Auth.isAuthenticated() && <a onClick={this.logout} className="active item">Logout</a>}
            </div>
          </div>

        </nav>
      </Container>
    )
  }
}

export default withRouter(Nav)
