import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBk5gQ0339d8qYUneid1Z2x_mxD2lqeTfE',
  authDomain: 'connect-88317.firebaseapp.com',
  databaseURL: 'https://connect-88317.firebaseio.com',
  projectId: 'connect-88317',
  storageBucket: 'connect-88317.appspot.com',
  messagingSenderId: '934647139758'
}
firebase.initializeApp(config)
