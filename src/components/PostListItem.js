import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Avatar from './Avatar'

class PostListItem extends Component {
  render() {
    const { post, compact } = this.props
    const avatarSize = 100

    return (
      <div className="d-flex p-3 mb-3 bg-dark rounded">
        <div>
          <div className="d-flex align-items-center">
            <Avatar url={post.photoURL} size={avatarSize} />
            <div className="ml-3">
              <h4>{post.title}</h4>
              <span className="text-muted">by {post.author}</span>
              <span className="pl-3">{post.commentCount}</span>
            </div>
          </div>

          {compact || <p className="mt-3">{post.description}</p>}

          {compact && (
            <Link className="btn btn-info mr-2 mt-3" to={`/posts/${post.id}`}>
              View
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default PostListItem
