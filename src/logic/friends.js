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
    const hasThisFriend = await getFriend(myUser.uid, friend.uid)

    if (!hasThisFriend) {
      setFriend(myUser.uid, friend)
      generateAndSaveOtpToDb(friend.uid)
      console.log('friend added')
      setSuccessMessage('Friend added!!!')
    } else {
      setErrorMessage('You already added this friend')
    }
  } else {
    console.log('no user with this otp')
    setErrorMessage('User not found')
  }
}
