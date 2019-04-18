import React from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import Auth from '../../lib/auth'
import QraftForm from './qraftForm'

class QraftsEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      materials: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/materials')
      .then(res => {
        this.setState({ materials: res.data})
      })
      .catch(err => console.log(err))
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/qrafts/${this.props.match.params.id}`,
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/qrafts'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {

    return (
      <main className="section">
        <Container style={{ marginTop: '3em' }}>
          <h4> Edit a Qraft </h4>
          <QraftForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={this.state.data}
            materials={this.state.materials}
            errors={this.state.errors}
          />
        </Container>
      </main>
    )
  }
}

export default QraftsEdit
