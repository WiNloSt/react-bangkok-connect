import React from 'react'
import styled from 'styled-components'

const Avatar = styled.img`
  height: 100px;
  border-radius: 100%;
`

function FriendListItem(props) {
  const { friend } = props
  const avatarHeight = 100

  return (
    <div className="d-flex align-items-center p-3 mb-3 bg-light rounded">
      <Avatar src={`${friend.photoURL}?height=${avatarHeight}`} />
      <div className="ml-3 text-left">
        <div className="mb-2">
          <b>{friend.displayName}</b>
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
