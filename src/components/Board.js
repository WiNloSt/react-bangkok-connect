import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import PostCreate from './PostCreate'
import PostList from './PostList'
import PostDetail from './PostDetail'

class Board extends Component {
  render() {
    return (
      <div className="container p-3 text-left">
        <h1 className="text-center">Boards</h1>
        <Route
          exact
          path="/posts"
          render={() => (
            <div className="d-flex align-items-center py-3">
              <div className="ml-auto">
                <Link to="/posts/create" className="btn btn-primary">
                  Create Thread
                </Link>
              </div>
            </div>
          )}
        />

        <Switch>
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/posts/create" component={PostCreate} />
          <Route path="/posts/:pid" component={PostDetail} />
        </Switch>
      </div>
    )
  }
}

export default Board
