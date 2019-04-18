import React from 'react'

import SimpleImageSlider from 'react-simple-image-slider'

class ImageSlider extends React.Component {
  render() {
    const images = [
      { url: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg' },
      { url: 'https://react.semantic-ui.com/images/avatar/large/tim.jpg' },
      { url: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg' }

    ]

    return (
      <main>
        <div>
          <SimpleImageSlider
            width={896}
            height={504}
            images={images}
          />
        </div>
      </main>
    )
  }
}

export default ImageSlider
