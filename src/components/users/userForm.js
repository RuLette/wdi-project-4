import React from 'react'
import { Container, Form, Grid, Segment, Button, Header, Message, Image} from 'semantic-ui-react'

const UserForm = ({ user, data, handleChange, handleSubmit }) => {
  console.log(user)
  return (
    <Container style={{ marginTop: '2em', marginBottom: '5em' }}>
      <Form size='large'
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Name"
              name="username"
              onChange={handleChange}
              value={data.username || ''}
            />

          </div>
        </div>
        <div className="field">
          <label className="label">Profile Picture</label>
          <div className="control">
            <input
              className="input"
              placeholder="Add a photo via url"
              name="profile_picture"
              onChange={handleChange}
              value={data.profile_picture || ''}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="input"
              placeholder="Describe yourself"
              name="profile_description"
              onChange={handleChange}
              value={data.profile_description || ''}
            />
          </div>
        </div>

        <button>Submit</button>
      </Form>
    </Container>

  )
}

export default UserForm
