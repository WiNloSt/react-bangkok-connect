import React from 'react'
import * as R from 'ramda'

const context = React.createContext()

const ACTIONS = {
  setOtp: 'setOtp'
}

export const actions = {
  setOtp: otp => ({ type: ACTIONS.setOtp, otp })
}

export class StoreProvider extends React.Component {
  state = {
    otp: null
  }

  stateReducer = (state, action) => {
    if (action.type === ACTIONS.setOtp) {
      return R.merge(state, { otp: action.otp })
    }
    return state
  }

  dispatch = action => this.setState(this.stateReducer(this.state, action))

  render() {
    return (
      <context.Provider
        value={{
          ...this.state,
          user: this.props.user,
          dispatch: this.dispatch
        }}
      >
        {this.props.children}
      </context.Provider>
    )
  }
}

export const StoreConsumer = context.Consumer
