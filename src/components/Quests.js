import React from 'react'
import { getUser } from '../data'
import { StoreConsumer } from '../store'
export class Quests extends React.Component {
  state = {
    otp: null
  }

  render() {
    const { otp } = this.state
    return (
      <StoreConsumer>
        {({ user }) => {
          if (user) {
            getUser(user.uid).then(user => this.setState({ otp: user.otp }))
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
