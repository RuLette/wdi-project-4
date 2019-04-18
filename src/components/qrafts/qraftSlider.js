import React from 'react'

import SimpleImageSlider from 'react-simple-image-slider'

// <Image src= {qraft.photo} onError={this.addAltImage} size='large'  />
// ?null image?

class ImageSlider extends React.Component {
  render() {
    const images = [
      { url: 'dsfds' },
      { url: 'https://react.semantic-ui.com/images/avatar/large/tim.jpg' },
      { url: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg' }
    ]

    return (
      <main>
        <div>
          <SimpleImageSlider
            width={600}
            height={400}
            images={images}
          />
        </div>
      </main>
    )
  }
}

export default ImageSlider
