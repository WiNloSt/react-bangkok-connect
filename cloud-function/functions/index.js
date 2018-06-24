// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const firestore = admin.firestore()
const FieldValue = admin.firestore.FieldValue
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createFriendAcheivement = functions.firestore
  .document('users/{userID}/friends/{friendID}')
  .onCreate(((snap, context) => {
    firestore.collection('achievements').add({
      type: 'networking',
      uid: context.params.userID,
      fid: context.params.friendID,
      createdAt: FieldValue.serverTimestamp()
    })
  }))

exports.createBountyAchievement = functions.firestore
  .document('posts/{postID}/participants/{participantID}')
  .onUpdate((snap, context) => {
    const newValue = snap.after.data()
    const oldValue = snap.before.data()

    if (oldValue.isRewarded !== newValue.isRewarded) {
      if (newValue.isRewarded) {
        firestore.collection('achievements').add({
          type: 'bounty',
          uid: context.params.participantID,
          pid: context.params.postID,
          createdAt: FieldValue.serverTimestamp()
        })
      } else {
        firestore.collection('achievements')
          .where("type", "==", "bounty")
          .where("uid", "==", context.params.participantID)
          .where("pid", "==", context.params.postID)
          .get()
          .then(snapshot => snapshot.forEach(doc => doc.ref.delete()))
          .catch(error => {
            console.error(error)
          })
      }
    }
  })

function getPoint(type) {
  switch (type) {
    case "networking":
      return 100
    case "bounty":
      return 400
    default:
      return 0
  }
}

// exports.getLeaderboard = functions.https.onRequest((req, res) => {
//   switch (req.method) {
//     case 'POST':
//       break;
//     default:
//       return 
//   }
//   return firestore
//     .collection('achievements')
//     .get()
//     .then(snapshot => {
//       const users = new Map()
//       snapshot.forEach(doc => {
//           const achievement = doc.data()
//           if (!users.has(achievement.uid)) {
//             users.set(achievement.uid, getPoint(doc.data().type))
//           } else {
//             users.set(achievement.uid, users.get(achievement.uid) + getPoint(doc.data().type))
//           }
//       })

//       const topTen = [...users].map(user => [user.key, user.value])
      
//     })
// })