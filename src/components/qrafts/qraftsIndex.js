import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Card, Container, Image} from 'semantic-ui-react'
import Auth from '../../lib/auth'

class QraftIndex extends React.Component {

  constructor() {
    super()

    this.state = {
      search: '',
      filter: 'all',
      materials: [],
      user: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.getUser()
    axios.get('api/qrafts')
      .then(res => {
        console.log(res)
        const materials = res.data.reduce((acc, qraft) => {
          const existingIDs = acc.map(qraft => qraft.id)
          const newMaterials = qraft.materials.filter(material => !existingIDs.includes(material.id))
          return [...acc, ...newMaterials]
        }, [])

        console.log(materials.sort((a, b) => {
          return a.id - b.id
        }))
        this.setState({ qrafts: res.data, materials })
      }
      )
  }

  handleSubmit() {
    this.props.history.push('/comment')
  }

  handleChange(e) {
    console.log('changing')
    this.setState({ filter: e.target.value })
  }

  handleSearch(e) {
    this.setState({ search: e.target.value })
  }

  qraftSearchFilter(qrafts) {
    if (!this.state.search) return qrafts

    const re = new RegExp(this.state.search, 'i')
    return qrafts.filter(qraft => re.test(qraft.name))
  }

  qraftMaterialFilter(qrafts) {
    if (this.state.filter === 'all') return qrafts
    return qrafts.filter(qraft => qraft.materials.map(material => material.name).includes(this.state.filter))
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.user.id === Auth.getPayload().sub
  }

  addAltImage(e){
    e.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'
  }

  getUser() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        console.log(res, 'getting user')
        this.setState({ user: res.data })
      })
  }

  render() {
    const {qrafts, materials} = this.state
    {qrafts && console.log(qrafts)}
    console.log(this.state.user.id)
    if(!qrafts) return null
    return (

      <Container style={{ marginTop: '3em' }}>
        <div className="indexoptiondiv">
          <div className="select">
            Filter by: <select
              name="qrafts"
              onChange={this.handleChange}
              defaultValue="all"
            >
              <option value="all">All Materials</option>
              {materials.map(material => (
                <option key={material.id} value={material.name}>{material.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="indexoptiondiv">
          <div className="searchdiv">
            Search: <input
              className="input"
              type="text"
              placeholder="Search by qraft"
              value={this.state.search}
              onChange={this.handleSearch}
            / >
          </div>
        </div>
        <section className = "indexsection">

          <div className="indexdiv">


            {this.qraftSearchFilter(this.qraftMaterialFilter(qrafts)).map((qraft, i) => (
              <div key={i} className="qraftindexdiv">
                <Card className="carddiv">
                  <Card.Content>
                    <div className="carddescript">
                      <h4>{qraft.name}</h4>
                      <Card.Description>{qraft.description ? qraft.description: 'No description submitted'}</Card.Description>

                    </div>
                  </Card.Content>
                  <div className="imgdiv"><Link to={`/qrafts/${qraft.id}`} ><Image src= {qraft.photo} className="imgshow" onError={this.addAltImage} /></Link></div>


                  {Auth.isAuthenticated() &&
                <Card.Content>
                  <Card.Meta>
                    <button className="ui mini basic button right floated button">
                      {this.isOwner() ? <Link to={`/user/${qraft.creator.id}`}>Qrafter: {qraft.creator.username}</Link>  : ''}</button>
                  </Card.Meta>
                </Card.Content>
                  }
                </Card>

              </div>
            ))}

          </div>
        </section>
      </Container>
    )
  }
}

export default QraftIndex
