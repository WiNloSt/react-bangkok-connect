import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import logo from './logo.svg'
import Redirect from 'react-router-dom/Redirect'

const AppStyle = styled.div`
  text-align: center;
`

const Nav = styled.nav`
  > ul {
    display: flex;
    list-style: none;

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

class App extends Component {
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
            <Title>Welcome to React</Title>
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
