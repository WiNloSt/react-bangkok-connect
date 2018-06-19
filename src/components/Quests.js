import React from 'react'
import { getUser } from '../data'

export class Quests extends React.Component {
  state = {
    otp: null
  }

  async componentDidMount() {
    const uid = 'loLZSVdcmTaA12RDieozhKcnem33'
    const user = await getUser(uid)
    this.setState({ otp: user.otp })
  }

  render() {
    const { otp } = this.state
    return (
      <React.Fragment>
        <h1>Quests</h1>
        <p>My OTP is: {otp}</p>
      </React.Fragment>
    )
  }
}
