import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const candidates = [
  {
    name: 'Lalanarwon Montritanasarn',
    photo: 'https://graph.facebook.com/2541887849170224/picture'
  },
  {
    name: 'Kitti Sintuprasert',
    photo: 'https://graph.facebook.com/10213366752108025/picture'
  },
  {
    name: 'Thanawat Chookes',
    photo: 'https://graph.facebook.com/2242745939075800/picture'
  },
  {
    name: 'Monji Thas',
    photo: 'https://graph.facebook.com/2227026767338141/picture'
  },
  {
    name: 'Voraton Lertrattanapaisal',
    photo: 'https://graph.facebook.com/2113510495527225/picture'
  },
  {
    name: 'Phoomparin Mano',
    photo: 'https://graph.facebook.com/440085883123557/picture'
  }
]

const WinnerContainer = styled.div`
  background: white;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #333;
  border-radius: 0.5rem;
  min-width: 400px;

  > img {
    margin-right: 1rem;
    border-radius: 50%;
  }
`

const Winner = ({ user }) => (
  <WinnerContainer>
    <img src={user.photo} alt={`${user.name}`} />
    {user.name}
  </WinnerContainer>
)

export class Prizes extends React.Component {
  state = {
    index: 0
  }

  _random = () =>
    this.setState(state => {
      let index = state.index
      while (index === state.index) {
        index =
          Math.floor(Math.random() * candidates.length) % candidates.length
      }
      return {
        index
      }
    })

  random = (_, timeout = 1) => {
    console.log(timeout)
    const isFirstClick = timeout === 1
    if (isFirstClick) {
      const from = 700
      const to = 1200
      this.timeout = Math.floor(Math.random() * (to - from) + from)
    }
    if (timeout >= this.timeout) {
      return
    }
    setTimeout(() => {
      timeout += timeout / 6
      this._random()
      this.random(null, timeout)
    }, timeout)
  }

  render() {
    return (
      <Container>
        <div className="d-none">
          {candidates.map(candidate => (
            <Winner key={candidate.name} user={candidate} />
          ))}
        </div>
        <div>
          <Winner user={candidates[this.state.index]} />
          <div className="mt-3">
            <button className="btn btn-primary" onClick={this.random}>
              Random
            </button>
          </div>
        </div>
      </Container>
    )
  }
}
