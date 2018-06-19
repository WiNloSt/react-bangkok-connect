import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
