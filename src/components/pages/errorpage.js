import React from 'react'
import {Container, Icon} from 'semantic-ui-react'

class ErrorPage extends React.Component {
  constructor() {
    super()

  }

  render() {
    return (
      <main>
        <Container style={{ marginTop: '3em' }}>
          <h1>
            404 error <span><Icon name='user' /></span>
          </h1>

          <p> Sorry! The content you were looking for has been disassembled by overly excitable qrafters.</p>

        </Container>
      </main>
    )
  }
}

export default ErrorPage
