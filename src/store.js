import React from 'react'
import * as R from 'ramda'
import { onUserChanged, onFriendsChanged, onAchievementsChanged } from './data'

const context = React.createContext()

const ACTIONS = {}

export const actions = {}

export class StoreProvider extends React.Component {
  state = {
    user: {},
    friends: [],
    achievements: []
  }

  unsubscribeList = []

  stateReducer = (state, action) => {
    return state
  }

  dispatch = action => this.setState(this.stateReducer(this.state, action))

  updateUserStore = user => this.setState(state => R.merge(state, { user }))

  componentDidMount() {
    if (this.props.authUser) {
      const { uid } = this.props.authUser

      this.unsubscribeList.push(onUserChanged(uid, this.updateUserStore))
      this.unsubscribeList.push(
        onFriendsChanged(uid, friends => this.setState({ friends }))
      )
      this.unsubscribeList.push(
        onAchievementsChanged(uid, achievements =>
          this.setState({ achievements })
        )
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser) {
      const { uid } = nextProps.authUser
      this.unsubscribeList.push(onUserChanged(uid, this.updateUserStore))
      this.unsubscribeList.push(
        onFriendsChanged(uid, friends => this.setState({ friends }))
      )
      this.unsubscribeList.push(
        onAchievementsChanged(uid, achievements =>
          this.setState({ achievements })
        )
      )
    }

    const userLogout = this.props.authUser && !nextProps.authUser
    if (userLogout) {
      this.unsubscribeList.forEach(unsubscribe => unsubscribe())
    }
  }

  render() {
    return (
      <context.Provider
        value={{
          ...this.state,
          authUser: this.props.authUser,
          dispatch: this.dispatch
        }}
      >
        {this.props.children}
      </context.Provider>
    )
  }
}

export const StoreConsumer = context.Consumer
