import React from 'react'
import { StoreConsumer } from '../store'

import PostForm from './PostForm'

function PostCreate() {
  return (
    <React.Fragment>
      <h3 className="mt-3 mb-3">Create Post</h3>
      <StoreConsumer>{({ user }) => <PostForm user={user} />}</StoreConsumer>
    </React.Fragment>
  )
}

export default PostCreate
