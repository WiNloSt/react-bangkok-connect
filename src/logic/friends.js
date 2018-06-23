import { queryUser, setFriend, getFriend } from '../data'
import { generateAndSaveOtpToDb } from './login'

export const handleAddFriendWithOtp = async (
  otp,
  myUser,
  { setErrorMessage, setSuccessMessage }
) => {
  const friends = await queryUser(['otp', '==', otp])
  if (friends.length > 0) {
    const friend = friends[0]
    const hasThisFriend = getFriend(myUser.uid, friend.uid)

    if (!hasThisFriend) {
      setFriend(myUser.uid, friend)
      generateAndSaveOtpToDb(friend.uid)
      console.log('friend added')
      setSuccessMessage('Friend added!!!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      setErrorMessage('You already added this friend')
      setTimeout(() => setErrorMessage(''), 3000)
    }
  } else {
    console.log('no user with this otp')
    setErrorMessage('User not found')
    setTimeout(() => setErrorMessage(''), 3000)
  }
}
