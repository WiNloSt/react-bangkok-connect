import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import Promise from 'bluebird'
import axios from 'axios'
import Redirect from 'react-router-dom/Redirect'

import Friends from './components/Friends'
import Board from './components/Board'
import { Quests } from './components/Quests'
import { createOtpForUserIfNotExist, setUserData } from './logic/login'
import { StoreProvider } from './store'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Login } from './components/Login'
import { setUser } from './data'

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
  flex-direction: column;
`

class App extends Component {
  state = {
    loading: true,
    authUser: null
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

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.handleLoggedIn(authUser)
      } else {
        this.handleNonLoggedIn()
      }
    })
  }

  logout = async () => {
    firebase.auth().signOut()
  }

  handleLoggedIn(authUser) {
    this.setState({ authUser })
    setUserData(authUser)
    createOtpForUserIfNotExist(authUser)
    updateUserProfileUrlIfRedirectedFromFacebook()
  }

  handleNonLoggedIn() {
    this.setState({ authUser: null })
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <StoreProvider authUser={this.state.authUser}>
        <Router>
          <AppStyle>
            {!this.state.authUser ? (
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
                    component={() => <Friends user={this.state.authUser} />}
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

function updateUserProfileUrlIfRedirectedFromFacebook() {
  firebase
    .auth()
    .getRedirectResult()
    .then(async function(result) {
      if (result.credential) {
        const token = result.credential.accessToken
        const user = result.user
        const facebookUid = user.providerData[0].uid
        const profileUrl = await axios
          .get(
            `https://graph.facebook.com/${facebookUid}?fields=link&access_token=${token}`
          )
          .then(res => res.data.link)
        setUser(user.uid, {
          profileURL: profileUrl
        })
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.error(`${errorCode}: ${errorMessage}`)
    })
}
