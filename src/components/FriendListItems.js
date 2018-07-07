import React from 'react'

import Avatar from './Avatar'
import { Tags, Tag } from './Dashboard'
import styled from 'styled-components'

const FriendTag = styled(Tag)`
  margin-left: 0;
`

const FriendTags = styled(Tags)`
  margin-bottom: 0.5rem;
`

function FriendListItem(props) {
  const { friend } = props
  console.log(friend)
  const avatarSize = 100

  return (
    <div className="d-flex align-items-center p-3 mb-3 bg-dark rounded">
      <Avatar url={friend.photoURL} size={avatarSize} />
      <div className="ml-3 text-left">
        <div className="mb-2">
          <b>{friend.name}</b>
        </div>
        <FriendTags>
          {friend.tags &&
            friend.tags.map((interest, index) => (
              <FriendTag key={index}>{interest}</FriendTag>
            ))}
        </FriendTags>
        <a
          className="btn btn-primary btn-sm"
          href={`https://www.facebook.com/search/str/${friend.name.toLowerCase()}/keywords_users`}
          target="_blank"
          role="button"
        >
          Find Facebook profile
        </a>
      </div>
    </div>
  )
}

export default FriendListItem
