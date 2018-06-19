import React, { Component } from 'react'

class PostListItem extends Component {
  render() {
    const { post } = this.props

    return (
      <div className="d-flex p-3 mb-3 bg-light rounded">
        <div>
          <h4>{post.title}</h4>
          <span className="text-muted">by {post.author}</span>
          <span className="pl-3">{post.voteScore}</span>

          <span className="pl-3">{post.commentCount}</span>

          <p className="mt-3">{post.description}</p>

          <div className="mt-3">
            <span className="badge badge-primary">{post.tag}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PostListItem
