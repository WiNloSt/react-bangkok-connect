import React, { Component } from 'react'
import PostListItem from './PostListItem'
import CommentListItem from './CommentListItem'
import CommentForm from './CommentForm'

import firebase from 'firebase/app'

import { getPost } from '../data'
import { StoreConsumer } from '../store'

class PostDetail extends Component {
  state = {
    post: null,
    comments: [],
    commentsListener: null
  }

  componentDidMount() {
    const { pid } = this.props.match.params

    this.fetchPost(pid)

    const commentsListener = firebase
      .firestore()
      .collection(`posts/${pid}/comments`)
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        this.setState({
          comments: [
            ...snapshot.docs.map(doc =>
              Object.assign({ id: doc.id }, doc.data())
            )
          ]
        })
      })

    this.setState({
      commentsListener
    })
  }

  componentWillUnmount() {
    //Unsubscribe Listener
    this.state.commentsListener()
  }

  fetchPost = async pid => {
    const post = await getPost(pid)

    this.setState({
      post
    })

    return post
  }

  render() {
    const { post, comments } = this.state
    const { match } = this.props

    return (
      <StoreConsumer>
        {({ user }) => (
          <React.Fragment>
            {!post || <PostListItem post={post} />}

            <h5>Total Comments: {comments ? comments.length : 0}</h5>

            <div className="py-3">
              {comments && comments.length ? (
                comments.map(comment => (
                  <CommentListItem key={comment.id} comment={comment} />
                ))
              ) : (
                <div className="p-5 bg-light text-center rounded">
                  <h3 className="text-muted">No Comments</h3>
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <h5 className="my-3">Create new Comment</h5>
                  <CommentForm postID={match.params.pid} user={user} />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </StoreConsumer>
    )
  }
}

export default PostDetail
