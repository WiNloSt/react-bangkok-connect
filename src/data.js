import firebase from 'firebase/app'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

function getDataFromSnapshotQuery(snapshot) {
  return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
}

export const getUser = uid =>
  firestore
    .doc(`users/${uid}`)
    .get()
    .then(doc => (doc.exists ? doc.data() : null))

export const onUserChanged = (uid, callback) =>
  firestore.doc(`users/${uid}`).onSnapshot(doc => {
    callback(doc.data())
  })

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(data, { merge: true })

export const getOtp = otp => {
  const otpRef = firestore.doc(`otps/${otp}`)
  return otpRef.get().then(doc => (doc.exists ? doc.data() : null))
}

export const setOtp = (otp, data = {}) => {
  firestore.doc(`otps/${otp}`).set(data, { merge: true })
}

export const getFriends = uid =>
  firestore
    .collection(`users/${uid}/friends`)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

export const createPost = post =>
  firestore.collection('posts').add({
    ...post,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })

export const updatePost = (pid, data = {}) =>
  firestore.doc(`posts/${pid}`).update({
    ...data,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })

export const getPosts = () =>
  firestore
    .collection('posts')
    .orderBy('updatedAt', 'desc')
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

export const getPost = pid =>
  firestore
    .doc(`posts/${pid}`)
    .get()
    .then(
      doc => (doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null)
    )

export const createComment = (pid, comment) =>
  firestore.collection(`posts/${pid}/comments`).add({
    ...comment,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
