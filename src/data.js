import firebase from 'firebase/app'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
export const getUser = uid =>
  firestore
    .doc(`users/${uid}`)
    .get()
    .then(doc => (doc.exists ? doc.data() : null))

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(data, { merge: true })

export const getOtp = otp => {
  const otpRef = firestore.doc(`otps/${otp}`)
  return otpRef.get().then(doc => (doc.exists ? doc.data() : null))
}

export const setOtp = (otp, data = {}) => {
  firestore.doc(`otps/${otp}`).set(data, { merge: true })
}

function getDataFromSnapshotQuery(snapshot) {
  return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
}

export const getFriends = uid =>
  firestore
    .collection(`users/${uid}/friends`)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )
