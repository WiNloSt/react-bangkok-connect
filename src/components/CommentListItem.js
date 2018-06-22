import React from 'react'

import Avatar from './Avatar'

function CommentListItem(props) {
  const { comment } = props
  const avatarSize = 60

  return (
    <div className="d-flex bg-dark p-3 mb-3">
      <Avatar url={comment.photoURL} size={avatarSize} />
      <div className="ml-3">
        <p>{comment.body}</p>
        <span className="text-muted">by {comment.author}</span>
      </div>
    </div>
  )
}

export default CommentListItem
