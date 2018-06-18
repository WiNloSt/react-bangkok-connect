import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC1PQGh5JGgJtpmt1-dZKY7XPQgR12Xb6w',
  authDomain: 'reactbkk-connect.firebaseapp.com',
  databaseURL: 'https://reactbkk-connect.firebaseio.com',
  projectId: 'reactbkk-connect',
  storageBucket: 'reactbkk-connect.appspot.com',
  messagingSenderId: '946641983889'
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
