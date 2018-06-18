import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import firebase from 'firebase/app'

import logo from './logo.svg'
import Redirect from 'react-router-dom/Redirect'

import FacebookLoginButton from './components/FacebookLoginButton'

const AppStyle = styled.div`
  text-align: center;
`

const Nav = styled.nav`
  > ul {
    display: flex;
    list-style: none;
    margin: 1em 0;

    > li {
      &:not(:first-child) {
        margin-left: 1rem;
      }

      &:hover {
        color: #666;
      }
    }
  }
`

const Header = styled.header`
  background-color: #222;
  padding: 20px;
  color: white;
`

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`

const Title = styled.h1`
  font-size: 1.5em;
`

const Avatar = styled.img`
  height: 100px;
  border-radius: 100%;
`

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  logout = async () => {
    firebase.auth().signOut()
  }

  renderUserInfo() {
    const { user } = this.state
    const avatarHeight = 100

    if (user) {
      return (
        <div>
          <Avatar src={`${user.photoURL}?height=${avatarHeight}`} />
          <div className="p-3">Hi, {user.displayName}</div>
          <button type="button" className="btn btn-light" onClick={this.logout}>
            Log out
          </button>
        </div>
      )
    } else {
      return <FacebookLoginButton />
    }
  }

  render() {
    return (
      <Router>
        <AppStyle>
          <Nav>
            <ul>
              <li>
                <Link to="/boards">Boards</Link>
              </li>
              <li>
                <Link to="/quests">Quests</Link>
              </li>
            </ul>
          </Nav>
          <Header>
            <Logo src={logo} alt="logo" />
            <Title>Welcome to React Bangkok 3.0.0</Title>
            {this.renderUserInfo()}
          </Header>
          <Switch>
            <Redirect from="/" exact to="/boards" />
            <Route path="/boards">
              <h1>Boards</h1>
            </Route>
            <Route path="/quests">
              <h1>Quests</h1>
            </Route>
          </Switch>
        </AppStyle>
      </Router>
    )
  }
}

export default App
