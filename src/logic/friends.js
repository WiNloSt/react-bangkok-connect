import { queryUser, setFriend, deleteOtp } from '../data'
import { generateAndSaveOtpToDb } from './login'

export const handleAddFriendWithOtp = async (
  otp,
  myUser,
  { setErrorMessage, setSuccessMessage }
) => {
  const friend = await queryUser(['otp', '==', otp])
  if (friend) {
    setFriend(myUser.uid, friend)
    deleteOtp(friend.otp)
    generateAndSaveOtpToDb(friend.uid)
    console.log('friend added')
    setSuccessMessage('Friend added!!!')
    setTimeout(() => setSuccessMessage(''), 4000)
  } else {
    console.log('no user with this otp')
    setErrorMessage('User not found')
    setTimeout(() => setErrorMessage(''), 4000)
  }
}
