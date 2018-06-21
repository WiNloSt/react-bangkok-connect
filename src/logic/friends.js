import { queryUser, setFriend, deleteOtp } from '../data'
import { generateAndSaveOtpToDb } from './login'

export const handleAddFriendWithOtp = async (otp, myUser) => {
  const user = await queryUser(['otp', '==', otp])
  if (user) {
    setFriend(myUser.uid, user)
    deleteOtp(myUser.otp)
    generateAndSaveOtpToDb(myUser.uid)
    console.log('friend added')
  } else {
    console.log('no user with this otp')
  }
}
