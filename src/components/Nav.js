import React from 'react'
import { NavLink } from 'react-router-dom'
import { StoreConsumer } from '../store'
import { Avatar } from './Avatar'

export const Nav = ({ onLogout }) => (
  <StoreConsumer>
    {({ user }) => (
      <ul className="mx-2 my-1 nav nav-pills">
        <li className="nav-item">
          <NavLink className="nav-link px-2 py-1" to="/posts">
            Board
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-2 py-1" to="/quests">
            Quests
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-2 py-1" to="/friends">
            Friends
          </NavLink>
        </li>

        {user && (
          <React.Fragment>
            <Avatar
              className="ml-auto"
              height={32}
              src={`${user.photoURL}?height=32`}
            />
            <li>
              <button className="btn btn-link px-2 py-1" onClick={onLogout}>
                Logout
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
    )}
  </StoreConsumer>
)
