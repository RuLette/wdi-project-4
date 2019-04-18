import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Card, Container, Icon, Image, Button} from 'semantic-ui-react'
import Auth from '../../lib/auth'
const moment = require('moment')
import SimpleImageSlider from 'react-simple-image-slider'
import QraftComments from './qraftComments'
class QraftShow extends React.Component {

  constructor() {
    super()

    this.state = {

      data: {
        comment: {},
        content: ''
      },
      currentUser: {

      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)

  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  componentDidMount() {
    this.getUser()
    axios.get(`/api/qrafts/${this.props.match.params.id}`)
      .then(res => this.setState({ qraft: res.data }))
  }

  handleCommentSubmit(event) {
    event.preventDefault()
    axios.post(`/api/qrafts/${this.props.match.params.id}/comments`,
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then((res) => {
        const { content, created_at, id, owner} = res.data
        const newComment = { content, created_at, id, owner}
        const newComments = [...this.state.qraft.comments, newComment]
        const newQraft = {...this.state.qraft}
        newQraft.comments = newComments
        this.setState({ qraft: newQraft, data: { content: ''} })
      })
      .catch(err => console.log(err))
  }


  handleDelete() {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/qrafts/${this.props.match.params.id}`,
        { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(() => this.props.history.push('/qrafts'))
        .catch(err => console.log(err))
    }
  }


  handleDeleteComment(comments) {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/qrafts/${this.props.match.params.id}/comments/${comments.id}`,
        { headers: { Authorization: `Bearer ${Auth.getToken()}`}})

        .then(() => {
          const oldComments = this.state.qraft.comments
          const newComments = oldComments.filter(comment => comment.id !== comments.id)
          const newQraft = {...this.state.qraft, ...{comments: newComments}}
          this.setState({qraft: newQraft})
        })
        .catch(err => console.log(err))
    }
  }

  getUser() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        console.log(res, 'getting user')
        this.setState({ currentUser: res.data })
      })
  }

  addAltImage(e){
    e.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.qraft.creator.id === Auth.getPayload().sub
  }

  render() {
    if (!this.state.qraft) return null
    const {qraft} = this.state
    console.log(qraft)
    const images = [
      {url: qraft.photo || 'https://react.semantic-ui.com/images/wireframe/image.png'} ,
      { url: qraft.photo_additional1 || 'https://react.semantic-ui.com/images/wireframe/image.png'},
      { url: qraft.photo_additional2 || 'https://react.semantic-ui.com/images/wireframe/image.png' }
    ]
    return (
      <main>
        <Container style={{ marginTop: '3em' }}>

          {this.isOwner() &&
              <Card fluid>
                <Card.Content>
                  <Button.Group floated='right'>

                    <button  className= "ui mini basic button " attached='left'>
                      <Link to={`/qrafts/${Auth.getPayload().sub}/edit`}>Edit Qraft</Link>
                    </button>

                    <button  className= "ui mini basic button " attached='right' onClick={() => this.handleDelete(qraft)}>
                    Delete Qraft
                    </button>
                  </Button.Group>
                </Card.Content>
              </Card>
          }

        </Container>

        <Container>

          <Card.Group>
            <Card fluid  >
              {Auth.isAuthenticated() &&
              <Card.Content>

                {!this.isOwner() &&

                <Button.Group floated='right'>
                  <button  className= "ui mini basic button" attached='left'>
                    <Link to={`/user/${qraft.creator.id}`}>
                      <Card.Meta>Qrafter: {qraft.creator.username ?   qraft.creator.username : 'Unknown '}
                      </Card.Meta></Link>
                  </button>
                  <button  className= "ui mini basic button" attached='right'>
                    <Image src= {qraft.creator.profile_picture} onError={this.addAltImage} circular size='mini'/>
                  </button>
                </Button.Group>}

              </Card.Content>
              }
              <Card.Content>
                <div className="margincard">
                  <h3 >{qraft.name}</h3>
                  <Card.Meta>
                    <span className='date'>Uploaded: {moment(qraft.updated_at).format('MMM Do YYYY')}</span>
                  </Card.Meta>
                </div>
              </Card.Content>

              <Card.Content>
                <div className="margincard">
                  <Card.Description>
                    <p>{qraft.description}</p>
                  </Card.Description></div>

              </Card.Content>
              <Card.Content>
                <div className="margincard">
                  <div>
                    <SimpleImageSlider
                      width={600}
                      height={400}
                      images={images}
                    />

                  </div>
                </div>

              </Card.Content>

              <Card.Content>
                <div className="margincard"><h4>Dimensions:</h4>
                  <Card.Description>
                    <p>{qraft.dimensions}</p>
                  </Card.Description>
                </div>
              </Card.Content>
              <Card.Content>
                <div className="margincard">
                  <h4>Main material:</h4>
                  <Card.Description>
                    <p>{qraft.materials.map(material => material.name).join(', ')}</p>
                  </Card.Description>
                </div>

              </Card.Content>
              <Card.Content>
                <div className="margincard">
                  <h4>Available for order:</h4>
                  <Card.Description>
                    <p>{qraft.orderable}</p>
                  </Card.Description>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>

        <Container>

          <Card fluid>

            <Card.Content>
              <div className="margincard">

                <h3>Qraft process</h3>

              </div>
            </Card.Content>

            <Card.Content>
              <div className="margincard">
                <Card.Description>
                  <p>{qraft.instructions_main}</p>
                </Card.Description>
                {qraft.instructions_primary ? <h3>More Info</h3> : ''}
                {<Card.Description>{qraft.instructions_primary}</Card.Description> ? <Card.Description>{qraft.instructions_primary} </Card.Description>: ''}
              </div>
            </Card.Content>

            {Auth.isAuthenticated() &&
            <Card.Content>
              <div className="margincard">
                <QraftComments
                  handleChange={this.handleChange}
                  handleCommentSubmit={this.handleCommentSubmit}
                  handleDeleteComment={this.handleDeleteComment}
                  comment={this.state.qraft.comments}
                  commentText={this.state.data.content}
                  currentUser={this.state.currentUser}/>
              </div>

            </Card.Content>
            }
          </Card>

        </Container>
      </main>

    )
  }
}

export default QraftShow
