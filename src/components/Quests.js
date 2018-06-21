import React from 'react'
import { StoreConsumer } from '../store'
export class Quests extends React.Component {
  render() {
    return (
      <StoreConsumer>
        {({ user }) => {
          return (
            <React.Fragment>
              <h1>Quests</h1>
              <p>My OTP is: {user.otp}</p>
            </React.Fragment>
          )
        }}
      </StoreConsumer>
    )
  }
}
