import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import Promise from 'bluebird'

import Redirect from 'react-router-dom/Redirect'

import Friends from './components/Friends'
import Board from './components/Board'
import { Quests } from './components/Quests'
import { createOtpForUserIfNotExist, setUserData } from './logic/login'
import { StoreProvider } from './store'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Login } from './components/Login'

injectGlobal`
html, body, #root {
  padding: 0;
  margin: 0;
  height: 100%;
  background: #333;
  color: white;
}
`

const AppStyle = styled.div`
  text-align: center;
`

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

class App extends Component {
  state = {
    loading: true,
    user: null
  }

  componentDidMount() {
    const userPromise = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(() => {
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

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <StoreProvider user={this.state.user}>
        <Router>
          <AppStyle>
            {!this.state.user ? (
              <Center>
                <Redirect to="/" />
                <Login />
              </Center>
            ) : (
              <React.Fragment>
                <Nav onLogout={this.logout} />
                <Switch>
                  <Redirect from="/" exact to="/posts" />
                  <Route path="/posts" component={Board} />
                  <Route path="/quests" component={Quests} />
                  <Route
                    path="/friends"
                    component={() => <Friends user={this.state.user} />}
                  />
                </Switch>
              </React.Fragment>
            )}
          </AppStyle>
        </Router>
      </StoreProvider>
    )
  }
}

export default App
