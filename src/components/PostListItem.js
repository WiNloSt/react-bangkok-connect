import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostListItem extends Component {
  render() {
    const { post, compact } = this.props

    return (
      <div className="d-flex p-3 mb-3 bg-light rounded">
        <div>
          <h4>{post.title}</h4>
          <span className="text-muted">by {post.author}</span>
          <span className="pl-3">{post.voteScore}</span>

          <span className="pl-3">{post.commentCount}</span>

          {compact || <p className="mt-3">{post.description}</p>}

          <div className="mt-3 mb-3">
            <span className="badge badge-primary">{post.tag}</span>
          </div>

          {compact && (
            <Link className="btn btn-info mr-2" to={`/posts/${post.id}`}>
              View
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default PostListItem
