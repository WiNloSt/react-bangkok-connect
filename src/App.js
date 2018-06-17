import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import logo from './logo.svg'

import firebase from 'firebase/app'

const AppStyle = styled.div`
  text-align: center;
`

const Header = styled.header`
  background-color: #222;
  height: 150px;
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

const Intro = styled.p`
  font-size: large;
`

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC1PQGh5JGgJtpmt1-dZKY7XPQgR12Xb6w',
  authDomain: 'reactbkk-connect.firebaseapp.com',
  databaseURL: 'https://reactbkk-connect.firebaseio.com',
  projectId: 'reactbkk-connect',
  storageBucket: 'reactbkk-connect.appspot.com',
  messagingSenderId: '946641983889'
}
firebase.initializeApp(config)

class App extends Component {
  render() {
    return (
      <AppStyle>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title>Welcome to React</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </AppStyle>
    )
  }
}

export default App
