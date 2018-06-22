import { queryUser, setFriend, deleteOtp } from '../data'
import { generateAndSaveOtpToDb } from './login'

export const handleAddFriendWithOtp = async (otp, myUser) => {
  const friend = await queryUser(['otp', '==', otp])
  if (friend) {
    setFriend(myUser.uid, friend)
    deleteOtp(friend.otp)
    generateAndSaveOtpToDb(friend.uid)
    console.log('friend added')
  } else {
    console.log('no user with this otp')
  }
}
