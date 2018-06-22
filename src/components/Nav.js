import React from 'react'
import { NavLink as UnStyledNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faChalkboard,
  faQuestion,
  faHome
} from '@fortawesome/free-solid-svg-icons'

import { StoreConsumer } from '../store'
import Avatar from './Avatar'
import { Toggle } from 'react-powerplug'

const Desktop = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: block;
  }
`

const BelowDesktop = styled.div`
  order: 1;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`

const NavLink = styled(UnStyledNavLink)`
  &.active > svg {
    color: #007bff;
  }
`

const TabMenu = styled.div`
  color: #333;
  height: 50px;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    max-width: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

const TabMenuOffset = styled.div`
  height: 50px;
`

const User = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  z-index: 1;
`

const PopupContainer = styled.div`
  position: absolute;
  right: 0;
  top: unset;
  left: unset;
  bottom: unset;
  margin-top: 1rem;
`

const Popup = ({ onLogout }) => (
  <PopupContainer
    className="popover fade bs-popover-bottom show"
    role="tooltip"
    x-placement="left"
  >
    <div className="arrow" style={{ left: 45 }} />
    <div className="popover-body">
      <button className="btn btn-link px-2 py-1" onClick={onLogout}>
        Logout
      </button>
    </div>
  </PopupContainer>
)

export const Nav = ({ onLogout }) => (
  <StoreConsumer>
    {({ authUser }) => (
      <React.Fragment>
        <Desktop>
          <ul className="mx-2 my-3 nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/posts">
                Board
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/quests">
                Quests
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/friends">
                Friends
              </NavLink>
            </li>

            {authUser && (
              <React.Fragment>
                <Avatar className="ml-auto" size={32} url={authUser.photoURL} />
                <li>
                  <button className="btn btn-link px-2 py-1" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </Desktop>
        <BelowDesktop>
          <User>
            {authUser && (
              <Toggle intial={false}>
                {({ on, toggle }) => (
                  <div className="position-relative">
                    <Avatar
                      className="ml-auto"
                      size={48}
                      src={authUser.photoURL}
                      onClick={toggle}
                    />
                    {on && <Popup onLogout={onLogout} />}
                  </div>
                )}
              </Toggle>
            )}
          </User>
          <TabMenu>
            <div>
              <NavLink to="/dashboard">
                <FontAwesomeIcon icon={faHome} style={{ fontSize: 18 }} />
              </NavLink>
              <NavLink to="/posts">
                <FontAwesomeIcon icon={faChalkboard} />
              </NavLink>
              <NavLink to="/quests">
                <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 18 }} />
              </NavLink>
              <NavLink to="/friends">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ fontSize: 17 }}
                />
              </NavLink>
            </div>
          </TabMenu>
          <TabMenuOffset />
        </BelowDesktop>
      </React.Fragment>
    )}
  </StoreConsumer>
)
