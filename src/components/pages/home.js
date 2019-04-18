import React from 'react'
import { Container } from 'semantic-ui-react'
import SimpleImageSlider from 'react-simple-image-slider'

const moment = require('moment')
const today = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

const Home = () => {
  const images = [
    { url: 'https://lh3.googleusercontent.com/ffSEts-9uUC0ze2lbdibnrTgH0v1Nq9JrKkkg3x9AMraorvnrVP1WQW_MxIT2o-mS3OqzvQyn5lsaoWrWhUhOWsiIv6ZghZbd-1VOo4QSC9mzt1vUQcuEIy7kMvyOgZ_c17U5YkT=w2400' },
    { url: 'https://lh3.googleusercontent.com/_fLjjGwf2wrpZJPR_tuhqM06Bq2_NWHh6TpnVHntYROvKQMiJdZyS4ooTa_gMyKJsIwOTi61Mm7vNabQ6mCjM4bFmrljNo5s1OGBQkrgSnyuguOu3zoWY34fjVrPj_hFLKloFXix=w2400' },
    { url: 'https://lh3.googleusercontent.com/tuU2ATtg2Bjxd3sZXHOnMb1KqRTrzFZOx9KxSr1jtuuFMKFjAfaEzWMSeYskd1ct0_tJN3GGLewAslLfo-5ZQRPO_Mt_YII9k28rr8Ha1YL5I1UAZaDU1ejEVFyso77_MJkDwnbz=w2400' }

  ]
  return(
    <Container style={{ marginTop: '3em', marginBottom: '5em' }}>

      <div>
        <h4> Qraft: Custom made, DIY furniture showcase</h4>

      </div>
      <div className="rightmenu">
        <p>Log chairs by <a href='http://torafu.com/'> Torafu</a></p>

        <SimpleImageSlider
          width={1200}
          height={534}
          images={images}
          slideDuration={0.5}
        />
      </div>
      <div>

      </div>
      <div className="rightmenu">
        <p>{today}</p>

      </div>
    </Container>
  )
}

export default Home
