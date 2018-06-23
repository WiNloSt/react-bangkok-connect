import firebase from 'firebase/app'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const returnDocOrNull = doc => (doc.exists ? doc.data() : null)

function getDataFromSnapshotQuery(snapshot) {
  return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
}

export const queryUser = query =>
  firestore
    .collection('users')
    .where(...query)
    .get()
    .then(snapshot => {
      let users = []
      snapshot.forEach(doc => users.push(doc.data()))
      return users
    })

export const getUser = uid =>
  firestore
    .doc(`users/${uid}`)
    .get()
    .then(returnDocOrNull)

export const onUserChanged = (uid, callback) =>
  firestore.doc(`users/${uid}`).onSnapshot(doc => {
    callback(doc.data())
  })

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(data, { merge: true })

export const getOtp = otp => {
  const otpRef = firestore.doc(`otps/${otp}`)
  return otpRef.get().then(returnDocOrNull)
}

export const getFriend = (uid, friendId) =>
  firestore
    .doc(`users/${uid}/friends/${friendId}`)
    .get()
    .then(returnDocOrNull)

export const getFriends = uid =>
  firestore
    .collection(`users/${uid}/friends`)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

export const onFriendsChanged = (uid, callback) =>
  firestore.collection(`users/${uid}/friends`).onSnapshot(snapshot => {
    let friends = []
    snapshot.forEach(doc => {
      friends.push(doc.data())
    })
    callback(friends)
  })

export const setFriend = (uid, friend) => {
  firestore
    .doc(`users/${uid}/friends/${friend.uid}`)
    .set(friend, { merge: true })
}

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

export const onAchievementsChanged = (uid, callback) =>
  firestore
    .collection(`achievements`)
    .where('uid', '==', uid)
    .onSnapshot(snapshot => {
      const achievements = []
      snapshot.forEach(doc => achievements.push({ id: doc.id, ...doc.data() }))
      callback(achievements)
    })
