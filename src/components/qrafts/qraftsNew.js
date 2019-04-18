import React from 'react'
import { Container } from 'semantic-ui-react'
import axios from 'axios'

import Auth from '../../lib/auth'
import QraftForm from './qraftForm'

class QraftsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
      },
      errors: {},
      materials: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
    console.log('handling change')
  }

  componentDidMount() {
    axios.get('/api/materials')
      .then(res => {
        this.setState({ materials: res.data})
      })
      .catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/qrafts',
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/qrafts'))
      .catch(err => console.log(err))
  }
  render() {
    if (!this.state.materials.length) return null
    console.log(this.state)
    return (
      <main className="section">
        <Container style={{ marginTop: '3em' }}>
          <h4>Post a Qraft </h4>
          <QraftForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={this.state.data}
            errors={this.state.errors}
            materials={this.state.materials}
          />
        </Container>
      </main>
    )
  }
}

export default QraftsNew
