import React, { Component } from 'react'
import styled, { keyframes, injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import Promise from 'bluebird'

import logo from './logo.svg'
import Redirect from 'react-router-dom/Redirect'

import FacebookLoginButton from './components/FacebookLoginButton'
import { Quests } from './components/Quests'
import { createOtpForUserIfNotExist, setUserData } from './logic/login'
import { StoreProvider } from './store'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Avatar } from './components/Avatar'

injectGlobal`
html, body, #root {
  padding: 0;
  margin: 0;
  height: 100%;
}
`

const AppStyle = styled.div`
  text-align: center;
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

class App extends Component {
  state = {
    loading: true,
    user: null
  }

  componentDidMount() {
    const userPromise = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        resolve()
      })
    })

    Promise.all([userPromise, Promise.delay(500)]).then(() => {
      this.setState({
        loading: false
      })
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleLoggedIn(user)
      } else {
        this.handleNonLoggedIn()
      }
    })
  }

  logout = async () => {
    firebase.auth().signOut()
  }

  handleLoggedIn(user) {
    this.setState({ user })
    setUserData(user)
    createOtpForUserIfNotExist(user)
  }

  handleNonLoggedIn() {
    this.setState({ user: null })
  }

  renderUserInfo() {
    const { user } = this.state
    const avatarHeight = 100

    if (user) {
      return (
        <React.Fragment>
          <Avatar
            height={avatarHeight}
            src={`${user.photoURL}?height=${avatarHeight}`}
          />
          <div className="p-3">Hi, {user.displayName}</div>
          <button type="button" className="btn btn-light" onClick={this.logout}>
            Log out
          </button>
        </React.Fragment>
      )
    } else {
      return <FacebookLoginButton />
    }
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <StoreProvider user={this.state.user}>
        <Router>
          <AppStyle>
            <Nav onLogout={this.logout} />
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
              <Route path="/quests" component={Quests} />
            </Switch>
          </AppStyle>
        </Router>
      </StoreProvider>
    )
  }
}

export default App
