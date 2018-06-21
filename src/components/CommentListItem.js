import React from 'react'

import { Avatar } from './Avatar'

function CommentListItem(props) {
  const { comment } = props
  const avatarHeight = 60

  return (
    <div className="d-flex bg-light p-3 mb-3">
      <Avatar
        className="align-self-center"
        src={`${comment.photoURL}?height=${avatarHeight}`}
        height={avatarHeight}
      />
      <div className="ml-3">
        <p>{comment.body}</p>
        <span className="text-muted">by {comment.author}</span>
      </div>
    </div>
  )
}

export default CommentListItem
