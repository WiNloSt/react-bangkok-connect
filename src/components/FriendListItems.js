import React from 'react'

import Avatar from './Avatar'

function FriendListItem(props) {
  const { friend } = props
  const avatarSize = 100

  return (
    <div className="d-flex align-items-center p-3 mb-3 bg-dark rounded">
      <Avatar url={friend.photoURL} size={avatarSize} />
      <div className="ml-3 text-left">
        <div className="mb-2">
          <b>{friend.name}</b>
        </div>
        <a
          className="btn btn-primary btn-sm"
          href={friend.profileURL}
          target="_blank"
          role="button"
        >
          Facebook profile
        </a>
      </div>
    </div>
  )
}

export default FriendListItem
