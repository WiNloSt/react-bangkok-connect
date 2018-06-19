import React from 'react'

const context = React.createContext()

export class StoreProvider extends React.Component {
  render() {
    return (
      <context.Provider value={{ user: this.props.user }}>
        {this.props.children}
      </context.Provider>
    )
  }
}

export const StoreConsumer = context.Consumer
