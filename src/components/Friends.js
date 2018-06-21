import React from 'react'

import FriendListItem from './FriendListItems'
import { StoreConsumer } from '../store'

const Friends = () => (
  <StoreConsumer>
    {({ friends }) => (
      <div className="container">
        <h1>Friends</h1>
        {friends.map(friend => (
          <FriendListItem friend={friend} key={friend.uid} />
        ))}
      </div>
    )}
  </StoreConsumer>
)
export default Friends
