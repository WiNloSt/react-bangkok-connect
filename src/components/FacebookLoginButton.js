import React, { Component } from 'react'

import firebase from 'firebase/app'

class FacebookLoginButton extends Component {
  login = async () => {
    const provider = new firebase.auth.FacebookAuthProvider()

    try {
      const result = await firebase.auth().signInWithRedirect(provider)

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //const token = result.credential.accessToken
      // The signed-in user info.
      const user = result.user

      console.log(user)
    } catch (error) {
      // Handle Error here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;

      console.log(`${errorCode}: ${errorMessage}`)
    }
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.login}>
        Facebook Login
      </button>
    )
  }
}

export default FacebookLoginButton
