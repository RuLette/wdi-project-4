import React from 'react'
import { Container, Grid, Header, Form, Segment, Button, Message} from 'semantic-ui-react'

const QraftForm = ({ data, handleChange, handleSubmit, materials, errors }) => {
  console.log(data, 'data')
  return (
    <Grid textAlign='left' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 850 }}>
        <Container style={{ marginTop: '2em', marginBottom: '5em' }}>
          <Form size='large'
            onSubmit={handleSubmit}
          >
            <Segment stacked>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={data.name || ''}
                  />
                  {errors.name && <p>Please enter a name</p> }
                </div>
              </div>

              <div className="field">
                <label className="label">Submit a photo</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Add a photo via url"
                    name="photo"
                    onChange={handleChange}
                    value={data.photo || ''}
                  />

                </div>
                <br />
                <Form.Field>
                  <label className="label">Select main material</label>
                  <div className="control">
                    <select
                      name="material_id"
                      defaultValue={data.materials_id || 'default'}
                      onChange={handleChange}>
                      <option disabled value="default">Choose a material</option>
                      {materials && materials.map(material => (
                        <option key={material.id} value={material.id}>{material.name}</option>
                      ))}
                    </select>
                  </div>
                </Form.Field>
              </div>

              <div className="field">
                <label className="label">Is the product available for order?</label>
                <div className="control">
                  <select
                    name="orderable"
                    defaultValue={data.orderable || 'default'}
                    onChange={handleChange}>
                    <option disabled value="default">Availability</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <h4>Optional fields</h4>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="input"
                    placeholder="Description of Qraft"
                    name="Description"
                    onChange={handleChange}
                    value={data.Description || ''}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Dimensions</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Dimensions e.g 400 x 400"
                    name="dimensions"
                    onChange={handleChange}
                    value={data.dimensions || ''}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Qraft process</label>
                <p></p>
                <div className="control">
                  <textarea
                    className="input"
                    placeholder="How did you make this qraft?"
                    name="instructions_main"
                    onChange={handleChange}
                    value={data.instructions_main || ''}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Additional info</label>
              
                <div className="control">
                  <textarea
                    className="input"
                    placeholder="Additional info"
                    name="Any additional info, such as a guide to material sourcing goes here"
                    onChange={handleChange}
                    value={data.instructions_primary || ''}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Submit additional photo</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Add a photo via url"
                    name="photo_additional1"
                    onChange={handleChange}
                    value={data.photo_additional1 || ''}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Submit additional photo</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Add a photo via url"
                    name="photo_additional2"
                    onChange={handleChange}
                    value={data.photo_additional2 || ''}
                  />
                </div>
              </div>
              <button>Submit</button>
            </Segment>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>

  )
}

export default QraftForm
