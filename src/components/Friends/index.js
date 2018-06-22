import React from 'react'
import FriendListItem from '../FriendListItems'
import styled from 'styled-components'
import { Toggle } from 'react-powerplug'

import { StoreConsumer } from '../../store'
import { createKeyframeAnimation, getCurrentOtpValue } from './util'
import { handleAddFriendWithOtp } from '../../logic/friends'

const cardHeight = 200
const animationDuration = 300

const CollapsableSection = styled.div`
  color: #333;
  max-width: 400px;
  height: 0;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  transition: all ${animationDuration}ms;
  visibility: visible;

  &.parent.expanded {
    height: ${cardHeight}px;
    visibility: visible;
    opacity: 1;
  }

  &.parent.collapsed {
  }

  form {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > {
    div {
      display: flex;
      flex-direction: column;
    }
  }
`

const Input = styled.input`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const getNumber = keyCode => {
  const isNumber = keyCode >= 48 && keyCode <= 57
  if (isNumber) {
    return keyCode - 48
  }

  const isNumPad = keyCode >= 96 && keyCode <= 105
  if (isNumPad) {
    return keyCode - 96
  }
}

const createHandleKeyDown = myUser => e => {
  e.preventDefault()
  const isNumber =
    (e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)
  const isBackspace = e.which === 8
  if (!isNumber && !isBackspace) {
    return
  }

  if (isNumber) {
    const currentElement = e.target
    const nextElement = e.target.nextElementSibling
    currentElement.value = getNumber(e.which)
    if (nextElement) {
      nextElement.focus()
    } else {
      // completed last digit
      currentElement.blur()
      const otp = getCurrentOtpValue(formRef.current)
      if (otp !== myUser.otp) {
        handleAddFriendWithOtp(otp, myUser)
      }
    }
  }

  if (isBackspace) {
    const currentElement = e.target
    const previousElement = e.target.previousElementSibling
    currentElement.value = ''
    if (previousElement) {
      previousElement.focus()
    }
  }
}

let formRef = React.createRef()
let firstInputRef

const AddFriendSection = ({ className }) => (
  <StoreConsumer>
    {({ user }) => (
      <CollapsableSection className={'card m-auto parent ' + className}>
        <div className="card-body">
          <p>Type your friend code to add them to your friend list</p>
          <form ref={formRef}>
            <Input
              onKeyDown={createHandleKeyDown(user)}
              className="form-control"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              innerRef={c => (firstInputRef = c)}
            />
            <Input
              onKeyDown={createHandleKeyDown(user)}
              className="form-control"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
            />
            <Input
              onKeyDown={createHandleKeyDown(user)}
              className="form-control"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
            />
            <Input
              onKeyDown={createHandleKeyDown(user)}
              className="form-control"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
            />
          </form>
        </div>
      </CollapsableSection>
    )}
  </StoreConsumer>
)

const getClassName = on => (on === null ? '' : on ? 'expanded' : 'collapsed')

const Friends = () => (
  <StoreConsumer>
    {({ user, friends }) => (
      <Toggle initial={null}>
        {({ on, toggle }) => (
          <div className="container">
            <h1>Friends</h1>
            <AddFriendSection className={getClassName(on)} />
            <div>
              <button
                className="btn btn-primary my-3"
                onClick={() => {
                  const isClickToExpand = on === false || on === null
                  if (isClickToExpand) {
                    firstInputRef.focus()
                  }
                  toggle()
                }}
              >
                Add Friends
              </button>
              <p>My friend code: {user.otp}</p>
              {friends.map(friend => (
                <FriendListItem friend={friend} key={friend.uid} />
              ))}
            </div>
          </div>
        )}
      </Toggle>
    )}
  </StoreConsumer>
)
export default Friends
