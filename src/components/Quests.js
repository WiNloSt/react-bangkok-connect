import React from 'react'
import { getUser } from '../data'
import { StoreConsumer, actions } from '../store'
export class Quests extends React.Component {
  render() {
    return (
      <StoreConsumer>
        {({ otp, user, dispatch }) => {
          if (user && !otp) {
            getUser(user.uid).then(user => dispatch(actions.setOtp(user.otp)))
          }
          return (
            <React.Fragment>
              <h1>Quests</h1>
              <p>My OTP is: {otp}</p>
            </React.Fragment>
          )
        }}
      </StoreConsumer>
    )
  }
}
