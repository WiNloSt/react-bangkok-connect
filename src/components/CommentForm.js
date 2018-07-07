import React, { Component } from 'react'
import Input from './Input'

import { createComment, updatePost, createParticipant } from '../data'

class CommentForm extends Component {
  state = {
    isSubmitting: false,
    wasValidated: false,
    comment: {
      body: '',
      isAnonymous: false
    }
  }

  handleChange = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    this.setState({
      comment: {
        ...this.state.comment,
        [event.target.name]: value
      }
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({
      wasValidated: true
    })

    if (!this.isCommentValid()) {
      return
    } else {
      this.setState({
        isSubmitting: true
      })

      try {
        if (this.state.isEditMode) {
          await this.props.createComments(this.state.comment)
        } else {
          const { user } = this.props

          await createComment(this.props.postID, {
            ...this.state.comment,
            author: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          })

          this.setState({
            wasValidated: false,
            isSubmitting: false,
            comment: {
              body: '',
              isAnonymous: false
            }
          })

          updatePost(this.props.postID)
          createParticipant(this.props.postID, {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
            isAnonymous: this.state.comment.isAnonymous
          })
        }
      } catch (error) {
        console.log(error)

        this.setState({
          isSubmitting: false
        })
      }
    }
  }

  isCommentValid() {
    const { comment } = this.state

    return (
      Object.keys(comment)
        .filter(key => typeof comment[key] === 'string')
        .filter(key => !comment[key].trim()).length === 0
    )
  }

  render() {
    const { comment, wasValidated, isSubmitting } = this.state

    return (
      <form
        className={`${wasValidated ? 'was-validated' : ''}`}
        onSubmit={this.handleSubmit}
      >
        <Input
          type="textarea"
          name="body"
          value={comment.body}
          rows={5}
          handleInputChanged={this.handleChange}
          placeholder="Write a comment ..."
          required
        />
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              name="isAnonymous"
              type="checkbox"
              onChange={this.handleChange}
              value={comment.isAnonymous}
            />
            <label className="form-check-label" htmlFor="isAnonymous">
              Is Anonymous
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    )
  }
}

export default CommentForm
