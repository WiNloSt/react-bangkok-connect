import React, { Component } from 'react'
import { getFriends } from '../data'

import FriendListItem from './FriendListItems'

class Friends extends Component {
  state = {
    friends: null
  }

  componentDidMount() {
    const { user } = this.props

    if (user) this.fetchFriends(user.uid)
  }

  fetchFriends = async uid => {
    const friends = await getFriends(uid)
    this.setState({
      friends
    })
  }

  render() {
    const { friends } = this.state

    return (
      <div className="container">
        <h1>Friends</h1>
        {!friends ||
          friends.map((friend, index) => (
            <FriendListItem friend={friend} key={index} />
          ))}
      </div>
    )
  }
}

export default Friends
